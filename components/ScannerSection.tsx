import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Zap, ArrowRight } from 'lucide-react';
import './ScannerSection.css';

// Type definitions for window extensions
declare global {
    interface Window {
        setScannerScanning?: (active: boolean) => void;
        getScannerStats?: () => any;
    }
}

const ScannerSection: React.FC = () => {
    // Refs for controller instances
    const cardStreamRef = useRef<any>(null);
    const particleSystemRef = useRef<any>(null);
    const particleScannerRef = useRef<any>(null);

    // Refs for DOM elements
    const containerRef = useRef<HTMLDivElement>(null);
    const cardLineRef = useRef<HTMLDivElement>(null);
    const speedIndicatorRef = useRef<HTMLSpanElement>(null);
    const particleCanvasRef = useRef<HTMLCanvasElement>(null);
    const scannerCanvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // --- 1. Card Stream Controller ---
        class CardStreamController {
            container: HTMLElement | null;
            cardLine: HTMLElement | null;
            speedIndicator: HTMLElement | null;
            position: number = 0;
            velocity: number = 120;
            direction: number = -1;
            isAnimating: boolean = true;
            isDragging: boolean = false;
            lastTime: number = 0;
            lastMouseX: number = 0;
            mouseVelocity: number = 0;
            friction: number = 0.95;
            minVelocity: number = 30;
            containerWidth: number = 0;
            cardLineWidth: number = 0;
            rafId: number = 0;
            updateInterval: any;

            constructor() {
                this.container = containerRef.current;
                this.cardLine = cardLineRef.current;
                this.speedIndicator = speedIndicatorRef.current;
                this.init();
            }

            init() {
                if (!this.cardLine || !this.container) return;
                this.populateCardLine();
                this.calculateDimensions();
                this.setupEventListeners();
                this.updateCardPosition();
                this.animate();
                this.startPeriodicUpdates();
            }

            calculateDimensions() {
                if (!this.container || !this.cardLine) return;
                this.containerWidth = this.container.offsetWidth;
                const cardWidth = 400;
                const cardGap = 60;
                const cardCount = this.cardLine.children.length;
                this.cardLineWidth = (cardWidth + cardGap) * cardCount;
            }

            setupEventListeners() {
                if (!this.cardLine) return;
                this.cardLine.addEventListener("mousedown", (e) => this.startDrag(e as MouseEvent));
                document.addEventListener("mousemove", (e) => this.onDrag(e as MouseEvent));
                document.addEventListener("mouseup", () => this.endDrag());

                // Touch support
                this.cardLine.addEventListener("touchstart", (e) => this.startDrag((e as TouchEvent).touches[0]), { passive: false });
                document.addEventListener("touchmove", (e) => this.onDrag((e as TouchEvent).touches[0]), { passive: false });
                document.addEventListener("touchend", () => this.endDrag());

                this.cardLine.addEventListener("wheel", (e) => this.onWheel(e as WheelEvent));
                this.cardLine.addEventListener("selectstart", (e) => e.preventDefault());
                this.cardLine.addEventListener("dragstart", (e) => e.preventDefault());

                window.addEventListener("resize", () => this.calculateDimensions());
            }

            startDrag(e: MouseEvent | Touch) {
                if (e instanceof MouseEvent) {
                    e.preventDefault();
                }

                this.isDragging = true;
                this.isAnimating = false;
                this.lastMouseX = e.clientX;
                this.mouseVelocity = 0;

                if (this.cardLine) {
                    const transform = window.getComputedStyle(this.cardLine).transform;
                    if (transform !== "none") {
                        const matrix = new DOMMatrix(transform);
                        this.position = matrix.m41;
                    }
                    this.cardLine.style.animation = "none";
                    this.cardLine.classList.add("dragging");
                }

                document.body.style.userSelect = "none";
                document.body.style.cursor = "grabbing";
            }

            onDrag(e: MouseEvent | Touch) {
                if (!this.isDragging) return;

                const deltaX = e.clientX - this.lastMouseX;
                this.position += deltaX;
                this.mouseVelocity = deltaX * 60;
                this.lastMouseX = e.clientX;

                if (this.cardLine) {
                    this.cardLine.style.transform = `translateX(${this.position}px)`;
                }
                this.updateCardClipping();
            }

            endDrag() {
                if (!this.isDragging) return;

                this.isDragging = false;
                if (this.cardLine) this.cardLine.classList.remove("dragging");

                if (Math.abs(this.mouseVelocity) > this.minVelocity) {
                    this.velocity = Math.abs(this.mouseVelocity);
                    this.direction = this.mouseVelocity > 0 ? 1 : -1;
                } else {
                    this.velocity = 120;
                }

                this.isAnimating = true;
                this.updateSpeedIndicator();

                document.body.style.userSelect = "";
                document.body.style.cursor = "";
            }

            animate() {
                const currentTime = performance.now();
                const deltaTime = (currentTime - this.lastTime) / 1000;
                this.lastTime = currentTime;

                if (this.isAnimating && !this.isDragging) {
                    if (this.velocity > this.minVelocity) {
                        this.velocity *= this.friction;
                    } else {
                        this.velocity = Math.max(this.minVelocity, this.velocity);
                    }
                    this.position += this.velocity * this.direction * deltaTime;
                    this.updateCardPosition();
                    this.updateSpeedIndicator();
                }

                this.rafId = requestAnimationFrame(() => this.animate());
            }

            updateCardPosition() {
                if (!this.cardLine) return;
                const containerWidth = this.containerWidth;
                const cardLineWidth = this.cardLineWidth;

                if (this.position < -cardLineWidth) {
                    this.position = containerWidth;
                } else if (this.position > containerWidth) {
                    this.position = -cardLineWidth;
                }

                this.cardLine.style.transform = `translateX(${this.position}px)`;
                this.updateCardClipping();
            }

            updateSpeedIndicator() {
                if (this.speedIndicator) {
                    this.speedIndicator.textContent = Math.round(this.velocity).toString();
                }
            }

            toggleAnimation() {
                this.isAnimating = !this.isAnimating;
            }

            resetPosition() {
                this.position = this.containerWidth;
                this.velocity = 120;
                this.direction = -1;
                this.isAnimating = true;
                this.isDragging = false;
                if (this.cardLine) {
                    this.cardLine.style.animation = "none";
                    this.cardLine.style.transform = `translateX(${this.position}px)`;
                    this.cardLine.classList.remove("dragging");
                }
                this.updateSpeedIndicator();
            }

            changeDirection() {
                this.direction *= -1;
                this.updateSpeedIndicator();
            }

            onWheel(e: WheelEvent) {
                e.preventDefault();
                const scrollSpeed = 20;
                const delta = e.deltaY > 0 ? scrollSpeed : -scrollSpeed;
                this.position += delta;
                this.updateCardPosition();
                this.updateCardClipping();
            }

            generateCode(width: number, height: number) {
                const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
                const pick = (arr: any[]) => arr[randInt(0, arr.length - 1)];

                const header = [
                    "// compiled preview • scanner demo",
                    "/* generated for visual effect – not executed */",
                    "const SCAN_WIDTH = 8;",
                    "const FADE_ZONE = 35;",
                    "const MAX_PARTICLES = 2500;",
                    "const TRANSITION = 0.05;",
                ];

                const helpers = [
                    "function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }",
                    "function lerp(a, b, t) { return a + (b - a) * t; }",
                    "const now = () => performance.now();",
                    "function rng(min, max) { return Math.random() * (max - min) + min; }",
                ];

                const particleBlock = (idx: number) => [
                    `class Particle${idx} {`,
                    "  constructor(x, y, vx, vy, r, a) {",
                    "    this.x = x; this.y = y;",
                    "    this.vx = vx; this.vy = vy;",
                    "    this.r = r; this.a = a;",
                    "  }",
                    "  step(dt) { this.x += this.vx * dt; this.y += this.vy * dt; }",
                    "}",
                ];

                const scannerBlock = [
                    "const scanner = {",
                    "  x: Math.floor(window.innerWidth / 2),",
                    "  width: SCAN_WIDTH,",
                    "  glow: 3.5,",
                    "};",
                    "",
                    "function drawParticle(ctx, p) {",
                    "  ctx.globalAlpha = clamp(p.a, 0, 1);",
                    "  ctx.drawImage(gradient, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);",
                    "}",
                ];

                const loopBlock = [
                    "function tick(t) {",
                    "  // requestAnimationFrame(tick);",
                    "  const dt = 0.016;",
                    "  // update & render",
                    "}",
                ];

                const misc = [
                    "const state = { intensity: 1.2, particles: MAX_PARTICLES };",
                    "const bounds = { w: window.innerWidth, h: 300 };",
                    "const gradient = document.createElement('canvas');",
                    "const ctx = gradient.getContext('2d');",
                    "ctx.globalCompositeOperation = 'lighter';",
                    "// ascii overlay is masked with a 3-phase gradient",
                ];

                const library: string[] = [];
                header.forEach(l => library.push(l));
                helpers.forEach(l => library.push(l));
                for (let b = 0; b < 3; b++) particleBlock(b).forEach(l => library.push(l));
                scannerBlock.forEach(l => library.push(l));
                loopBlock.forEach(l => library.push(l));
                misc.forEach(l => library.push(l));

                for (let i = 0; i < 40; i++) {
                    const n1 = randInt(1, 9);
                    const n2 = randInt(10, 99);
                    library.push(`const v${i} = (${n1} + ${n2}) * 0.${randInt(1, 9)};`);
                }
                for (let i = 0; i < 20; i++) {
                    library.push(`if (state.intensity > ${1 + (i % 3)}) { scanner.glow += 0.01; }`);
                }

                let flow = library.join(" ");
                flow = flow.replace(/\s+/g, " ").trim();
                const totalChars = width * height;
                while (flow.length < totalChars + width) {
                    const extra = pick(library).replace(/\s+/g, " ").trim();
                    flow += " " + extra;
                }

                let out = "";
                let offset = 0;
                for (let row = 0; row < height; row++) {
                    let line = flow.slice(offset, offset + width);
                    if (line.length < width) line = line + " ".repeat(width - line.length);
                    out += line + (row < height - 1 ? "\n" : "");
                    offset += width;
                }
                return out;
            }

            calculateCodeDimensions(cardWidth: number, cardHeight: number) {
                const fontSize = 11;
                const lineHeight = 13;
                const charWidth = 6;
                const width = Math.floor(cardWidth / charWidth);
                const height = Math.floor(cardHeight / lineHeight);
                return { width, height, fontSize, lineHeight };
            }

            createCardWrapper(index: number) {
                const wrapper = document.createElement("div");
                wrapper.className = "card-wrapper";

                const normalCard = document.createElement("div");
                normalCard.className = "card card-normal";

                const cardImages = [
                    "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b55e654d1341fb06f8_4.1.png",
                    "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5a080a31ee7154b19_1.png",
                    "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5c1e4919fd69672b8_3.png",
                    "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5f6a5e232e7beb4be_2.png",
                    "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5bea2f1b07392d936_4.png",
                ];

                const cardImage = document.createElement("img");
                cardImage.className = "card-image";
                cardImage.src = cardImages[index % cardImages.length];
                cardImage.alt = "Credit Card";

                normalCard.appendChild(cardImage);

                const asciiCard = document.createElement("div");
                asciiCard.className = "card card-ascii";

                const asciiContent = document.createElement("div");
                asciiContent.className = "ascii-content";

                const { width, height, fontSize, lineHeight } = this.calculateCodeDimensions(400, 250);
                asciiContent.style.fontSize = fontSize + "px";
                asciiContent.style.lineHeight = lineHeight + "px";
                asciiContent.textContent = this.generateCode(width, height);

                asciiCard.appendChild(asciiContent);
                wrapper.appendChild(normalCard);
                wrapper.appendChild(asciiCard);

                return wrapper;
            }

            updateCardClipping() {
                const scannerX = window.innerWidth / 2;
                const scannerWidth = 8;
                const scannerLeft = scannerX - scannerWidth / 2;
                const scannerRight = scannerX + scannerWidth / 2;
                let anyScanningActive = false;

                const wrappers = document.querySelectorAll(".card-wrapper");
                wrappers.forEach((wrapper) => {
                    const rect = wrapper.getBoundingClientRect();
                    const cardLeft = rect.left;
                    const cardRight = rect.right;
                    const cardWidth = rect.width;

                    // Type assertion for HTML elements
                    const normalCard = wrapper.querySelector(".card-normal") as HTMLElement;
                    const asciiCard = wrapper.querySelector(".card-ascii") as HTMLElement;

                    if (cardLeft < scannerRight && cardRight > scannerLeft) {
                        anyScanningActive = true;
                        // In React we typically avoid direct attribute mutation but good for perf here
                        const scannerIntersectLeft = Math.max(scannerLeft - cardLeft, 0);
                        const scannerIntersectRight = Math.min(scannerRight - cardLeft, cardWidth);

                        const normalClipRight = (scannerIntersectLeft / cardWidth) * 100;
                        const asciiClipLeft = (scannerIntersectRight / cardWidth) * 100;

                        normalCard.style.setProperty("--clip-right", `${normalClipRight}%`);
                        asciiCard.style.setProperty("--clip-left", `${asciiClipLeft}%`);

                        if (!wrapper.hasAttribute("data-scanned") && scannerIntersectLeft > 0) {
                            wrapper.setAttribute("data-scanned", "true");
                            // Create scan effect div
                            const scanEffect = document.createElement("div");
                            scanEffect.className = "scan-effect";
                            wrapper.appendChild(scanEffect);
                            setTimeout(() => {
                                if (scanEffect.parentNode) scanEffect.parentNode.removeChild(scanEffect);
                            }, 600);
                        }

                    } else {
                        if (cardRight < scannerLeft) {
                            normalCard.style.setProperty("--clip-right", "100%");
                            asciiCard.style.setProperty("--clip-left", "100%");
                        } else if (cardLeft > scannerRight) {
                            normalCard.style.setProperty("--clip-right", "0%");
                            asciiCard.style.setProperty("--clip-left", "0%");
                        }
                        wrapper.removeAttribute("data-scanned");
                    }
                });

                if (window.setScannerScanning) {
                    window.setScannerScanning(anyScanningActive);
                }
            }

            updateAsciiContent() {
                document.querySelectorAll(".ascii-content").forEach((content) => {
                    if (Math.random() < 0.15) {
                        const { width, height } = this.calculateCodeDimensions(400, 250);
                        content.textContent = this.generateCode(width, height);
                    }
                });
            }

            populateCardLine() {
                if (!this.cardLine) return;
                this.cardLine.innerHTML = "";
                const cardsCount = 30;
                for (let i = 0; i < cardsCount; i++) {
                    const cardWrapper = this.createCardWrapper(i);
                    this.cardLine.appendChild(cardWrapper);
                }
            }

            startPeriodicUpdates() {
                this.updateInterval = setInterval(() => {
                    this.updateAsciiContent();
                }, 200);
            }

            destroy() {
                cancelAnimationFrame(this.rafId);
                clearInterval(this.updateInterval);
                window.removeEventListener("resize", () => this.calculateDimensions());
            }
        } // End CardStreamController

        // --- 2. Particle System (ThreeJS) ---
        class ParticleSystem {
            scene: THREE.Scene;
            camera: THREE.OrthographicCamera;
            renderer: THREE.WebGLRenderer;
            particles: THREE.Points | null = null;
            particleCount: number = 400;
            canvas: HTMLCanvasElement;
            velocities: Float32Array = new Float32Array(0);
            alphas: Float32Array = new Float32Array(0);
            rafId: number = 0;

            constructor() {
                this.canvas = particleCanvasRef.current as HTMLCanvasElement;
                this.scene = new THREE.Scene();
                this.camera = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, 125, -125, 1, 1000);
                this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true });
                this.init();
            }

            init() {
                this.camera.position.z = 100;
                this.renderer.setSize(window.innerWidth, 250);
                this.renderer.setClearColor(0x000000, 0);
                this.createParticles();
                this.animate();
                window.addEventListener('resize', this.onWindowResize.bind(this));
            }

            createParticles() {
                const geometry = new THREE.BufferGeometry();
                const positions = new Float32Array(this.particleCount * 3);
                const colors = new Float32Array(this.particleCount * 3);
                const sizes = new Float32Array(this.particleCount);
                const velocities = new Float32Array(this.particleCount);

                // Texture generation
                const canvas = document.createElement("canvas");
                canvas.width = 100; canvas.height = 100;
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    const half = 50;
                    const hue = 217;
                    const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
                    gradient.addColorStop(0.025, "#fff");
                    gradient.addColorStop(0.1, `hsl(${hue}, 61%, 33%)`);
                    gradient.addColorStop(0.25, `hsl(${hue}, 64%, 6%)`); // Added back
                    gradient.addColorStop(1, "transparent");
                    ctx.fillStyle = gradient;
                    ctx.beginPath(); ctx.arc(half, half, half, 0, Math.PI * 2); ctx.fill();
                }
                const texture = new THREE.CanvasTexture(canvas);

                for (let i = 0; i < this.particleCount; i++) {
                    positions[i * 3] = (Math.random() - 0.5) * window.innerWidth * 2;
                    positions[i * 3 + 1] = (Math.random() - 0.5) * 250;
                    positions[i * 3 + 2] = 0;
                    colors[i * 3] = 1; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 1;

                    const orbitRadius = Math.random() * 200 + 100;
                    sizes[i] = (Math.random() * (orbitRadius - 60) + 60) / 8; // simplified
                    velocities[i] = Math.random() * 60 + 30;
                }

                geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
                geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
                geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
                this.velocities = velocities;

                const alphas = new Float32Array(this.particleCount);
                for (let i = 0; i < this.particleCount; i++) {
                    alphas[i] = (Math.random() * 8 + 2) / 10;
                }
                geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));
                this.alphas = alphas;

                const material = new THREE.ShaderMaterial({
                    uniforms: { pointTexture: { value: texture }, size: { value: 15.0 } },
                    vertexShader: `
                        attribute float alpha;
                        varying float vAlpha;
                        varying vec3 vColor;
                        uniform float size;
                        void main() {
                          vAlpha = alpha;
                          vColor = color;
                          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                          gl_PointSize = size;
                          gl_Position = projectionMatrix * mvPosition;
                        }
                      `,
                    fragmentShader: `
                        uniform sampler2D pointTexture;
                        varying float vAlpha;
                        varying vec3 vColor;
                        void main() {
                          gl_FragColor = vec4(vColor, vAlpha) * texture2D(pointTexture, gl_PointCoord);
                        }
                      `,
                    transparent: true,
                    blending: THREE.AdditiveBlending,
                    depthWrite: false,
                    vertexColors: true
                });

                this.particles = new THREE.Points(geometry, material);
                this.scene.add(this.particles);
            }

            animate() {
                this.rafId = requestAnimationFrame(this.animate.bind(this));
                if (this.particles) {
                    const positions = (this.particles.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
                    const alphas = (this.particles.geometry.attributes.alpha as THREE.BufferAttribute).array as Float32Array;
                    const time = Date.now() * 0.001;

                    for (let i = 0; i < this.particleCount; i++) {
                        positions[i * 3] += this.velocities[i] * 0.016;
                        if (positions[i * 3] > window.innerWidth / 2 + 100) {
                            positions[i * 3] = -window.innerWidth / 2 - 100;
                            positions[i * 3 + 1] = (Math.random() - 0.5) * 250;
                        }
                        positions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.5;

                        const twinkle = Math.floor(Math.random() * 10);
                        if (twinkle === 1 && alphas[i] > 0) { alphas[i] -= 0.05; }
                        else if (twinkle === 2 && alphas[i] < 1) { alphas[i] += 0.05; }

                        alphas[i] = Math.max(0, Math.min(1, alphas[i]));
                    }
                    this.particles.geometry.attributes.position.needsUpdate = true;
                    this.particles.geometry.attributes.alpha.needsUpdate = true;
                }
                this.renderer.render(this.scene, this.camera);
            }

            onWindowResize() {
                this.camera.left = -window.innerWidth / 2;
                this.camera.right = window.innerWidth / 2;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(window.innerWidth, 250);
            }

            destroy() {
                cancelAnimationFrame(this.rafId);
                if (this.renderer) this.renderer.dispose();
                if (this.particles) {
                    this.scene.remove(this.particles);
                    this.particles.geometry.dispose();
                    (this.particles.material as THREE.Material).dispose();
                }
            }
        }

        // --- 3. Particle Scanner (Canvas 2D) ---
        class ParticleScanner {
            canvas: HTMLCanvasElement;
            ctx: CanvasRenderingContext2D;
            w: number = window.innerWidth;
            h: number = 300;
            particles: any[] = [];
            count: number = 0;
            maxParticles: number = 800;
            intensity: number = 0.8;
            lightBarX: number = window.innerWidth / 2;
            lightBarWidth: number = 3;
            fadeZone: number = 60;
            scanningActive: boolean = false;
            rafId: number = 0;

            scanTargetIntensity: number = 1.8;
            scanTargetParticles: number = 2500;
            scanTargetFadeZone: number = 35;
            baseIntensity: number = 0.8;
            baseMaxParticles: number = 800;
            baseFadeZone: number = 60;
            currentIntensity: number = 0.8;
            currentMaxParticles: number = 800;
            currentFadeZone: number = 60;
            transitionSpeed: number = 0.05;
            currentGlowIntensity: number = 1;

            gradientCanvas: HTMLCanvasElement;
            gradientCtx: CanvasRenderingContext2D;

            constructor() {
                this.canvas = scannerCanvasRef.current as HTMLCanvasElement;
                this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
                // Initialize defaults
                this.baseIntensity = this.intensity;
                this.baseMaxParticles = this.maxParticles;
                this.baseFadeZone = this.fadeZone;
                this.currentIntensity = this.intensity;
                this.currentMaxParticles = this.maxParticles;
                this.currentFadeZone = this.fadeZone;

                // Temp initialization for strict property initialization
                this.gradientCanvas = document.createElement("canvas");
                this.gradientCtx = this.gradientCanvas.getContext("2d") as CanvasRenderingContext2D;

                this.init();
            }

            init() {
                this.setupCanvas();
                this.createGradientCache();
                this.initParticles();
                this.animate();
                window.addEventListener('resize', this.onResize.bind(this));
            }

            setupCanvas() {
                this.canvas.width = this.w;
                this.canvas.height = this.h;
                this.canvas.style.width = this.w + "px";
                this.canvas.style.height = this.h + "px";
                this.ctx.clearRect(0, 0, this.w, this.h);
            }

            onResize() {
                this.w = window.innerWidth;
                this.lightBarX = this.w / 2;
                this.setupCanvas();
            }

            createGradientCache() {
                this.gradientCanvas = document.createElement("canvas");
                this.gradientCtx = this.gradientCanvas.getContext("2d") as CanvasRenderingContext2D;
                this.gradientCanvas.width = 16;
                this.gradientCanvas.height = 16;

                const half = this.gradientCanvas.width / 2;
                const gradient = this.gradientCtx.createRadialGradient(half, half, 0, half, half, half);
                gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
                gradient.addColorStop(0.3, "rgba(196, 181, 253, 0.8)");
                gradient.addColorStop(0.7, "rgba(139, 92, 246, 0.4)");
                gradient.addColorStop(1, "transparent");

                this.gradientCtx.fillStyle = gradient;
                this.gradientCtx.beginPath();
                this.gradientCtx.arc(half, half, half, 0, Math.PI * 2);
                this.gradientCtx.fill();
            }

            randomFloat(min: number, max: number) {
                return Math.random() * (max - min) + min;
            }

            createParticle() {
                const intensityRatio = this.intensity / this.baseIntensity;
                const speedMultiplier = 1 + (intensityRatio - 1) * 1.2;
                const sizeMultiplier = 1 + (intensityRatio - 1) * 0.7;

                return {
                    x: this.lightBarX + this.randomFloat(-this.lightBarWidth / 2, this.lightBarWidth / 2),
                    y: this.randomFloat(0, this.h),
                    vx: this.randomFloat(0.2, 1.0) * speedMultiplier,
                    vy: this.randomFloat(-0.15, 0.15) * speedMultiplier,
                    radius: this.randomFloat(0.4, 1) * sizeMultiplier,
                    alpha: this.randomFloat(0.6, 1),
                    decay: this.randomFloat(0.005, 0.025) * (2 - intensityRatio * 0.5),
                    originalAlpha: 0,
                    life: 1.0,
                    time: 0,
                    startX: 0,
                    twinkleSpeed: this.randomFloat(0.02, 0.08) * speedMultiplier,
                    twinkleAmount: this.randomFloat(0.1, 0.25),
                };
            }

            initParticles() {
                for (let i = 0; i < this.maxParticles; i++) {
                    const particle = this.createParticle();
                    particle.originalAlpha = particle.alpha;
                    particle.startX = particle.x;
                    this.count++;
                    this.particles[this.count] = particle;
                }
            }

            updateParticle(particle: any) {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.time++;

                particle.alpha = particle.originalAlpha * particle.life + Math.sin(particle.time * particle.twinkleSpeed) * particle.twinkleAmount;
                particle.life -= particle.decay;

                if (particle.x > this.w + 10 || particle.life <= 0) {
                    this.resetParticle(particle);
                }
            }

            resetParticle(particle: any) {
                particle.x = this.lightBarX + this.randomFloat(-this.lightBarWidth / 2, this.lightBarWidth / 2);
                particle.y = this.randomFloat(0, this.h);
                particle.vx = this.randomFloat(0.2, 1.0);
                particle.vy = this.randomFloat(-0.15, 0.15);
                particle.alpha = this.randomFloat(0.6, 1);
                particle.originalAlpha = particle.alpha;
                particle.life = 1.0;
                particle.time = 0;
                particle.startX = particle.x;
            }

            drawParticle(particle: any) {
                if (particle.life <= 0) return;

                let fadeAlpha = 1;
                if (particle.y < this.fadeZone) {
                    fadeAlpha = particle.y / this.fadeZone;
                } else if (particle.y > this.h - this.fadeZone) {
                    fadeAlpha = (this.h - particle.y) / this.fadeZone;
                }
                fadeAlpha = Math.max(0, Math.min(1, fadeAlpha));

                this.ctx.globalAlpha = particle.alpha * fadeAlpha;
                this.ctx.drawImage(this.gradientCanvas, particle.x - particle.radius, particle.y - particle.radius, particle.radius * 2, particle.radius * 2);
            }

            drawLightBar() {
                const verticalGradient = this.ctx.createLinearGradient(0, 0, 0, this.h);
                verticalGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
                verticalGradient.addColorStop(this.fadeZone / this.h, "rgba(255, 255, 255, 1)");
                verticalGradient.addColorStop(1 - this.fadeZone / this.h, "rgba(255, 255, 255, 1)");
                verticalGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

                this.ctx.globalCompositeOperation = "lighter";

                const targetGlowIntensity = this.scanningActive ? 3.5 : 1;
                this.currentGlowIntensity += (targetGlowIntensity - this.currentGlowIntensity) * this.transitionSpeed;
                const glowIntensity = this.currentGlowIntensity;
                const lineWidth = this.lightBarWidth;

                const glow1Alpha = this.scanningActive ? 1.0 : 0.8;
                const glow2Alpha = this.scanningActive ? 0.8 : 0.6;
                const glow3Alpha = this.scanningActive ? 0.6 : 0.4;

                const coreGradient = this.ctx.createLinearGradient(this.lightBarX - lineWidth / 2, 0, this.lightBarX + lineWidth / 2, 0);
                coreGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
                coreGradient.addColorStop(0.3, `rgba(255, 255, 255, ${0.9 * glowIntensity})`);
                coreGradient.addColorStop(0.5, `rgba(255, 255, 255, ${1 * glowIntensity})`);
                coreGradient.addColorStop(0.7, `rgba(255, 255, 255, ${0.9 * glowIntensity})`);
                coreGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

                this.ctx.globalAlpha = 1;
                this.ctx.fillStyle = coreGradient;
                // RoundRect might not be supported in all contexts or older TS libs, use rect fallback or shim
                if (this.ctx.roundRect) {
                    this.ctx.beginPath();
                    this.ctx.roundRect(this.lightBarX - lineWidth / 2, 0, lineWidth, this.h, 15);
                    this.ctx.fill();
                } else {
                    this.ctx.fillRect(this.lightBarX - lineWidth / 2, 0, lineWidth, this.h);
                }

                // Glow 1
                const glow1Gradient = this.ctx.createLinearGradient(this.lightBarX - lineWidth * 2, 0, this.lightBarX + lineWidth * 2, 0);
                glow1Gradient.addColorStop(0, "rgba(139, 92, 246, 0)");
                glow1Gradient.addColorStop(0.5, `rgba(196, 181, 253, ${0.8 * glowIntensity})`);
                glow1Gradient.addColorStop(1, "rgba(139, 92, 246, 0)");
                this.ctx.globalAlpha = glow1Alpha;
                this.ctx.fillStyle = glow1Gradient;
                if (this.ctx.roundRect) {
                    this.ctx.beginPath(); this.ctx.roundRect(this.lightBarX - lineWidth * 2, 0, lineWidth * 4, this.h, 25); this.ctx.fill();
                } else {
                    this.ctx.fillRect(this.lightBarX - lineWidth * 2, 0, lineWidth * 4, this.h);
                }

                // Glow 2
                const glow2Gradient = this.ctx.createLinearGradient(this.lightBarX - lineWidth * 4, 0, this.lightBarX + lineWidth * 4, 0);
                glow2Gradient.addColorStop(0, "rgba(139, 92, 246, 0)");
                glow2Gradient.addColorStop(0.5, `rgba(139, 92, 246, ${0.4 * glowIntensity})`);
                glow2Gradient.addColorStop(1, "rgba(139, 92, 246, 0)");
                this.ctx.globalAlpha = glow2Alpha;
                this.ctx.fillStyle = glow2Gradient;
                if (this.ctx.roundRect) {
                    this.ctx.beginPath(); this.ctx.roundRect(this.lightBarX - lineWidth * 4, 0, lineWidth * 8, this.h, 35); this.ctx.fill();
                } else {
                    this.ctx.fillRect(this.lightBarX - lineWidth * 4, 0, lineWidth * 8, this.h);
                }

                if (this.scanningActive) {
                    const glow3Gradient = this.ctx.createLinearGradient(this.lightBarX - lineWidth * 8, 0, this.lightBarX + lineWidth * 8, 0);
                    glow3Gradient.addColorStop(0, "rgba(139, 92, 246, 0)");
                    glow3Gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.2)");
                    glow3Gradient.addColorStop(1, "rgba(139, 92, 246, 0)");
                    this.ctx.globalAlpha = glow3Alpha;
                    this.ctx.fillStyle = glow3Gradient;
                    if (this.ctx.roundRect) {
                        this.ctx.beginPath(); this.ctx.roundRect(this.lightBarX - lineWidth * 8, 0, lineWidth * 16, this.h, 45); this.ctx.fill();
                    } else {
                        this.ctx.fillRect(this.lightBarX - lineWidth * 8, 0, lineWidth * 16, this.h);
                    }
                }

                this.ctx.globalCompositeOperation = "destination-in";
                this.ctx.globalAlpha = 1;
                this.ctx.fillStyle = verticalGradient;
                this.ctx.fillRect(0, 0, this.w, this.h);
            }

            render() {
                const targetIntensity = this.scanningActive ? this.scanTargetIntensity : this.baseIntensity;
                const targetMaxParticles = this.scanningActive ? this.scanTargetParticles : this.baseMaxParticles;
                const targetFadeZone = this.scanningActive ? this.scanTargetFadeZone : this.baseFadeZone;

                this.currentIntensity += (targetIntensity - this.currentIntensity) * this.transitionSpeed;
                this.currentMaxParticles += (targetMaxParticles - this.currentMaxParticles) * this.transitionSpeed;
                this.currentFadeZone += (targetFadeZone - this.currentFadeZone) * this.transitionSpeed;

                this.intensity = this.currentIntensity;
                this.maxParticles = Math.floor(this.currentMaxParticles);
                this.fadeZone = this.currentFadeZone;

                this.ctx.globalCompositeOperation = "source-over";
                this.ctx.clearRect(0, 0, this.w, this.h);

                this.drawLightBar();

                this.ctx.globalCompositeOperation = "lighter";
                for (let i = 1; i <= this.count; i++) {
                    if (this.particles[i]) {
                        this.updateParticle(this.particles[i]);
                        this.drawParticle(this.particles[i]);
                    }
                }

                const currentIntensity = this.intensity;
                const currentMaxParticles = this.maxParticles;
                const intensityRatio = this.intensity / this.baseIntensity;

                if (Math.random() < currentIntensity && this.count < currentMaxParticles) {
                    const p = this.createParticle(); p.startX = p.x; p.originalAlpha = p.alpha;
                    this.count++; this.particles[this.count] = p;
                }

                if (intensityRatio > 1.1 && Math.random() < (intensityRatio - 1.0) * 1.2) {
                    const p = this.createParticle(); p.startX = p.x; p.originalAlpha = p.alpha;
                    this.count++; this.particles[this.count] = p;
                }
                if (intensityRatio > 1.3 && Math.random() < (intensityRatio - 1.3) * 1.4) {
                    const p = this.createParticle(); p.startX = p.x; p.originalAlpha = p.alpha;
                    this.count++; this.particles[this.count] = p;
                }
                if (intensityRatio > 1.5 && Math.random() < (intensityRatio - 1.5) * 1.8) {
                    const p = this.createParticle(); p.startX = p.x; p.originalAlpha = p.alpha;
                    this.count++; this.particles[this.count] = p;
                }
                if (intensityRatio > 2.0 && Math.random() < (intensityRatio - 2.0) * 2.0) {
                    const p = this.createParticle(); p.startX = p.x; p.originalAlpha = p.alpha;
                    this.count++; this.particles[this.count] = p;
                }

                if (this.count > currentMaxParticles + 200) {
                    const excessCount = Math.min(15, this.count - currentMaxParticles);
                    for (let i = 0; i < excessCount; i++) {
                        delete this.particles[this.count - i];
                    }
                    this.count -= excessCount;
                }
            }

            animate() {
                this.render();
                this.rafId = requestAnimationFrame(this.animate.bind(this));
            }

            destroy() {
                cancelAnimationFrame(this.rafId);
            }
        } // End ParticleScanner


        // Instantiate Controllers
        if (containerRef.current) {
            cardStreamRef.current = new CardStreamController();
            particleSystemRef.current = new ParticleSystem();
            particleScannerRef.current = new ParticleScanner();

            // Global hooks
            window.setScannerScanning = (active) => {
                if (particleScannerRef.current) particleScannerRef.current.scanningActive = active;
            }
        }

        return () => {
            if (cardStreamRef.current) cardStreamRef.current.destroy();
            if (particleSystemRef.current) particleSystemRef.current.destroy();
            if (particleScannerRef.current) particleScannerRef.current.destroy();
            // cleanup generic window methods? Maybe leave them as they don't break
        };

    }, []);

    // Button Handlers
    const toggleAnimation = () => cardStreamRef.current?.toggleAnimation();
    const resetPosition = () => cardStreamRef.current?.resetPosition();
    const changeDirection = () => cardStreamRef.current?.changeDirection();

    return (
        <div className="scanner-section-root relative">
            <div className="absolute top-[15%] left-0 w-full z-20 flex flex-col items-center justify-center pointer-events-none px-4">
                <h2 className="text-white text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-center pointer-events-auto drop-shadow-2xl max-w-4xl leading-tight">
                    No need to burn your <br /><span className="text-[#3b82f6]">credit card money</span>
                </h2>
                <div className="pointer-events-auto">
                    <button className="group flex items-center gap-3 bg-[#3b82f6] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-[0_20px_40px_rgba(59,130,246,0.4)] hover:shadow-[0_25px_50px_rgba(59,130,246,0.6)] transition-all hover:-translate-y-1 active:scale-95">
                        <Zap className="w-4 h-4 fill-current group-hover:animate-pulse" />
                        Blueprint My Flow
                    </button>
                </div>
            </div>

            <div className="controls">
                <button className="control-btn" onClick={toggleAnimation}>⏸️ Pause</button>
                <button className="control-btn" onClick={resetPosition}>🔄 Reset</button>
                <button className="control-btn" onClick={changeDirection}>↔️ Direction</button>
            </div>

            <div className="speed-indicator">
                Speed: <span ref={speedIndicatorRef}>120</span> px/s
            </div>

            <div className="container" ref={containerRef}>
                <canvas id="particleCanvas" ref={particleCanvasRef}></canvas>
                <canvas id="scannerCanvas" ref={scannerCanvasRef}></canvas>

                <div className="scanner"></div>

                <div className="card-stream" id="cardStream">
                    <div className="card-line" id="cardLine" ref={cardLineRef}></div>
                </div>
            </div>

            <div className="inspiration-credit">
                Inspired by <a href="https://evervault.com/" target="_blank" rel="noopener noreferrer">@evervault.com</a>
            </div>
        </div>
    );
};

export default ScannerSection;
