import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Trees, Sun, Moon, Sparkles, Wind, Volume2, VolumeX, Sliders, Eye, RefreshCw, Compass } from 'lucide-react';
import { StorageService } from '../utils/storage';

export type ForestAtmosphere = 'morning' | 'noon' | 'dusk' | 'night';

interface PeacefulForest3DProps {
  isPanicOrCamouflage?: boolean;
  isNightMode?: boolean;
}

export const PeacefulForest3D: React.FC<PeacefulForest3DProps> = ({
  isPanicOrCamouflage = false,
  isNightMode = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [atmosphere, setAtmosphere] = useState<ForestAtmosphere>(() => {
    return isNightMode ? 'night' : 'morning';
  });
  const [isForestSoundActive, setIsForestSoundActive] = useState<boolean>(false);
  const [soundVolume, setSoundVolume] = useState<number>(15);
  const [showForestControls, setShowForestControls] = useState<boolean>(false);
  const [windSpeed, setWindSpeed] = useState<number>(1.0);
  const [cameraParallaxEnabled, setCameraParallaxEnabled] = useState<boolean>(true);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const foliageMeshesRef = useRef<THREE.Mesh[]>([]);
  const leavesParticlesRef = useRef<THREE.Points | null>(null);
  const firefliesParticlesRef = useRef<THREE.Points | null>(null);
  const sunRaysRef = useRef<THREE.Group | null>(null);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  // Web Audio Synthesizer refs for natural sound (wind in leaves, subtle birds, stream)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const windGainRef = useRef<GainNode | null>(null);
  const streamGainRef = useRef<GainNode | null>(null);
  const birdTimerRef = useRef<number | null>(null);

  // Sync atmosphere when night mode changes
  useEffect(() => {
    if (isNightMode && atmosphere !== 'night') {
      setAtmosphere('night');
    } else if (!isNightMode && atmosphere === 'night') {
      setAtmosphere('morning');
    }
  }, [isNightMode]);

  // Color palettes for atmospheres
  const atmospherePresets = {
    morning: {
      name: 'Aurore & Brume Dorée',
      icon: '🌅',
      skyColor: 0xd8e8d8,
      fogColor: 0xc4dcc4,
      fogDensity: 0.014,
      groundColor: 0x4a6b3d,
      trunkColor: 0x5c4033,
      foliageColor1: 0x5d8a4a,
      foliageColor2: 0x7da85b,
      foliageColor3: 0x9bc26b,
      lightColor: 0xfff2cc,
      lightIntensity: 1.4,
      hemiSky: 0xe3f2e1,
      hemiGround: 0x3d5c2e,
      fireflyColor: 0xffea88,
      godRayOpacity: 0.35,
    },
    noon: {
      name: 'Midi Forêt Vivante',
      icon: '☀️',
      skyColor: 0xcfe6d5,
      fogColor: 0xb8dec2,
      fogDensity: 0.012,
      groundColor: 0x3f6333,
      trunkColor: 0x543d2b,
      foliageColor1: 0x477836,
      foliageColor2: 0x609942,
      foliageColor3: 0x82b84e,
      lightColor: 0xffffff,
      lightIntensity: 1.6,
      hemiSky: 0xd4eedb,
      hemiGround: 0x325227,
      fireflyColor: 0xffffff,
      godRayOpacity: 0.25,
    },
    dusk: {
      name: 'Crépuscule Serein',
      icon: '🌄',
      skyColor: 0x6e5264,
      fogColor: 0x593d50,
      fogDensity: 0.015,
      groundColor: 0x3b332b,
      trunkColor: 0x402a22,
      foliageColor1: 0x5c4238,
      foliageColor2: 0x7a5038,
      foliageColor3: 0xa66943,
      lightColor: 0xffa057,
      lightIntensity: 1.3,
      hemiSky: 0x8c667a,
      hemiGround: 0x2b1e19,
      fireflyColor: 0xffbb55,
      godRayOpacity: 0.45,
    },
    night: {
      name: 'Nuit Étoilée & Lucioles',
      icon: '🌙',
      skyColor: 0x09111e,
      fogColor: 0x0b1726,
      fogDensity: 0.018,
      groundColor: 0x0f1d18,
      trunkColor: 0x14181a,
      foliageColor1: 0x132b20,
      foliageColor2: 0x1a382c,
      foliageColor3: 0x244c3c,
      lightColor: 0x8ab8e6,
      lightIntensity: 0.65,
      hemiSky: 0x132238,
      hemiGround: 0x07110f,
      fireflyColor: 0x66ffaa,
      godRayOpacity: 0.15,
    },
  };

  // Build Three.js 3D Procedural Forest Scene
  useEffect(() => {
    if (!containerRef.current || isPanicOrCamouflage) return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const currentPreset = atmospherePresets[atmosphere];
    scene.background = new THREE.Color(currentPreset.skyColor);
    scene.fog = new THREE.FogExp2(currentPreset.fogColor, currentPreset.fogDensity);

    // 2. Camera setup with realistic natural FOV
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 300);
    camera.position.set(0, 3.2, 12);
    camera.lookAt(0, 3.5, 0);
    cameraRef.current = camera;

    // 3. WebGL Renderer with antialiasing and shadow support
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const hemiLight = new THREE.HemisphereLight(
      currentPreset.hemiSky,
      currentPreset.hemiGround,
      0.9
    );
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const dirLight = new THREE.DirectionalLight(currentPreset.lightColor, currentPreset.lightIntensity);
    dirLight.position.set(25, 45, 20);
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    // Ambient light for soft depth
    const ambLight = new THREE.AmbientLight(currentPreset.skyColor, 0.45);
    scene.add(ambLight);

    // 5. Undulating Terrain Mesh
    const terrainGeo = new THREE.PlaneGeometry(160, 160, 64, 64);
    terrainGeo.rotateX(-Math.PI / 2);

    const posAttr = terrainGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);
      // Gentle rolling hill math with a peaceful central walking clearing
      const distFromCenter = Math.sqrt(x * x + z * z);
      const hillWave =
        Math.sin(x * 0.08) * Math.cos(z * 0.08) * 1.6 +
        Math.sin(x * 0.03 + z * 0.04) * 2.2;
      const pathMask = Math.min(1.0, Math.max(0.1, distFromCenter / 18));
      posAttr.setY(i, hillWave * pathMask - 0.5);
    }
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshStandardMaterial({
      color: currentPreset.groundColor,
      roughness: 0.9,
      metalness: 0.05,
      flatShading: true,
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.position.y = 0;
    scene.add(terrainMesh);

    // 6. Detailed 3D Trees Generation (Canopy + Trunks + Foliage clusters)
    const foliageMeshes: THREE.Mesh[] = [];
    const trunkMat = new THREE.MeshStandardMaterial({
      color: currentPreset.trunkColor,
      roughness: 0.95,
      metalness: 0.05,
      flatShading: true,
    });

    const foliageMat1 = new THREE.MeshStandardMaterial({
      color: currentPreset.foliageColor1,
      roughness: 0.8,
      metalness: 0.05,
      flatShading: true,
    });
    const foliageMat2 = new THREE.MeshStandardMaterial({
      color: currentPreset.foliageColor2,
      roughness: 0.75,
      metalness: 0.05,
      flatShading: true,
    });
    const foliageMat3 = new THREE.MeshStandardMaterial({
      color: currentPreset.foliageColor3,
      roughness: 0.7,
      metalness: 0.05,
      flatShading: true,
    });

    // Helper: create an organic multi-tiered tree
    const createTree = (x: number, z: number, scale = 1, type: 'oak' | 'pine' | 'birch' = 'oak') => {
      const treeGroup = new THREE.Group();
      treeGroup.position.set(x, 0, z);

      if (type === 'pine') {
        // Conifer Pine Tree
        const trunkGeo = new THREE.CylinderGeometry(0.2 * scale, 0.35 * scale, 4.5 * scale, 6);
        const trunk = new THREE.Mesh(trunkGeo, trunkMat);
        trunk.position.y = (4.5 * scale) / 2;
        treeGroup.add(trunk);

        // 3 Tiers of Conical Foliage
        const tiers = 3;
        for (let t = 0; t < tiers; t++) {
          const coneGeo = new THREE.ConeGeometry(
            (2.2 - t * 0.45) * scale,
            (2.4 - t * 0.3) * scale,
            7
          );
          const coneMat = t % 2 === 0 ? foliageMat1 : foliageMat2;
          const cone = new THREE.Mesh(coneGeo, coneMat);
          cone.position.y = (2.6 + t * 1.3) * scale;
          treeGroup.add(cone);
          foliageMeshes.push(cone);
        }
      } else {
        // Broadleaf Lush Oak Tree
        const trunkGeo = new THREE.CylinderGeometry(0.32 * scale, 0.55 * scale, 4 * scale, 7);
        const trunk = new THREE.Mesh(trunkGeo, trunkMat);
        trunk.position.y = (4 * scale) / 2;
        trunk.rotation.z = (Math.sin(x) * 0.05);
        treeGroup.add(trunk);

        // Multi-cluster rounded organic canopies (Icosahedrons)
        const clusters = [
          { x: 0, y: 4.2 * scale, z: 0, r: 2.3 * scale, mat: foliageMat1 },
          { x: -1.0 * scale, y: 4.8 * scale, z: 0.6 * scale, r: 1.8 * scale, mat: foliageMat2 },
          { x: 1.1 * scale, y: 4.6 * scale, z: -0.5 * scale, r: 1.7 * scale, mat: foliageMat3 },
          { x: 0.2 * scale, y: 5.6 * scale, z: 0.2 * scale, r: 1.5 * scale, mat: foliageMat2 },
        ];

        clusters.forEach((cl) => {
          const canopyGeo = new THREE.IcosahedronGeometry(cl.r, 1);
          const canopy = new THREE.Mesh(canopyGeo, cl.mat);
          canopy.position.set(cl.x, cl.y, cl.z);
          treeGroup.add(canopy);
          foliageMeshes.push(canopy);
        });
      }

      scene.add(treeGroup);
    };

    // Plant trees in a realistic forest distribution around the clearing
    const treePositions: { x: number; z: number; scale: number; type: 'oak' | 'pine' }[] = [
      // Left foreground & midground
      { x: -6.5, z: 3, scale: 1.3, type: 'oak' },
      { x: -11, z: 0, scale: 1.5, type: 'pine' },
      { x: -8, z: -8, scale: 1.2, type: 'oak' },
      { x: -15, z: -12, scale: 1.7, type: 'pine' },
      { x: -5, z: -15, scale: 1.1, type: 'oak' },
      { x: -18, z: 5, scale: 1.6, type: 'oak' },

      // Right foreground & midground
      { x: 7.5, z: 2, scale: 1.35, type: 'oak' },
      { x: 12, z: -2, scale: 1.4, type: 'pine' },
      { x: 9, z: -10, scale: 1.3, type: 'oak' },
      { x: 16, z: -14, scale: 1.8, type: 'pine' },
      { x: 6, z: -18, scale: 1.2, type: 'oak' },
      { x: 19, z: 6, scale: 1.5, type: 'oak' },

      // Deep background layers
      { x: -2, z: -22, scale: 1.4, type: 'pine' },
      { x: 3, z: -26, scale: 1.5, type: 'oak' },
      { x: -12, z: -28, scale: 1.8, type: 'oak' },
      { x: 10, z: -30, scale: 1.7, type: 'pine' },
      { x: -22, z: -35, scale: 2.0, type: 'pine' },
      { x: 22, z: -35, scale: 2.0, type: 'oak' },
      { x: 0, z: -38, scale: 1.9, type: 'pine' },
      { x: -8, z: -44, scale: 2.2, type: 'oak' },
      { x: 12, z: -46, scale: 2.1, type: 'pine' },
    ];

    treePositions.forEach((tp) => {
      createTree(tp.x, tp.z, tp.scale, tp.type);
    });

    foliageMeshesRef.current = foliageMeshes;

    // 7. Atmospheric God Rays / Sun Beams Filtering Through the Canopy
    const godRaysGroup = new THREE.Group();
    const rayGeo = new THREE.CylinderGeometry(0.3, 3.5, 35, 12, 1, true);
    const rayMat = new THREE.MeshBasicMaterial({
      color: currentPreset.lightColor,
      transparent: true,
      opacity: currentPreset.godRayOpacity,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    for (let r = 0; r < 5; r++) {
      const ray = new THREE.Mesh(rayGeo, rayMat);
      ray.position.set(
        -8 + r * 4.2 + (Math.sin(r) * 2),
        16,
        -10 + r * 2.5
      );
      ray.rotation.z = -0.38 + (r * 0.04);
      ray.rotation.x = 0.22;
      godRaysGroup.add(ray);
    }
    scene.add(godRaysGroup);
    sunRaysRef.current = godRaysGroup;

    // 8. Drifting Golden Leaves Particle System
    const leavesCount = 180;
    const leavesGeo = new THREE.BufferGeometry();
    const leavesPos = new Float32Array(leavesCount * 3);
    const leavesVelocities: { x: number; y: number; z: number; rotSpeed: number }[] = [];

    for (let i = 0; i < leavesCount; i++) {
      leavesPos[i * 3] = (Math.random() - 0.5) * 50;
      leavesPos[i * 3 + 1] = Math.random() * 18 + 0.5;
      leavesPos[i * 3 + 2] = (Math.random() - 0.5) * 45;

      leavesVelocities.push({
        x: (Math.random() - 0.2) * 0.03,
        y: -0.015 - Math.random() * 0.02,
        z: (Math.random() - 0.5) * 0.02,
        rotSpeed: Math.random() * 0.03,
      });
    }
    leavesGeo.setAttribute('position', new THREE.BufferAttribute(leavesPos, 3));

    // Leaf particle texture (soft circle or diamond)
    const leafCanvas = document.createElement('canvas');
    leafCanvas.width = 32;
    leafCanvas.height = 32;
    const leafCtx = leafCanvas.getContext('2d');
    if (leafCtx) {
      const grad = leafCtx.createRadialGradient(16, 16, 2, 16, 16, 16);
      grad.addColorStop(0, 'rgba(230, 210, 120, 0.95)');
      grad.addColorStop(0.5, 'rgba(180, 200, 100, 0.7)');
      grad.addColorStop(1, 'rgba(100, 160, 60, 0)');
      leafCtx.fillStyle = grad;
      leafCtx.beginPath();
      leafCtx.arc(16, 16, 15, 0, Math.PI * 2);
      leafCtx.fill();
    }
    const leafTexture = new THREE.CanvasTexture(leafCanvas);

    const leavesMat = new THREE.PointsMaterial({
      size: 0.45,
      map: leafTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
    const leavesParticles = new THREE.Points(leavesGeo, leavesMat);
    scene.add(leavesParticles);
    leavesParticlesRef.current = leavesParticles;

    // 9. Bioluminescent Dancing Fireflies / Forest Spores
    const fireflyCount = 90;
    const fireflyGeo = new THREE.BufferGeometry();
    const fireflyPos = new Float32Array(fireflyCount * 3);
    const fireflyInitPos: { x: number; y: number; z: number; phase: number }[] = [];

    for (let i = 0; i < fireflyCount; i++) {
      const fx = (Math.random() - 0.5) * 35;
      const fy = Math.random() * 8 + 0.8;
      const fz = (Math.random() - 0.5) * 30;
      fireflyPos[i * 3] = fx;
      fireflyPos[i * 3 + 1] = fy;
      fireflyPos[i * 3 + 2] = fz;

      fireflyInitPos.push({
        x: fx,
        y: fy,
        z: fz,
        phase: Math.random() * Math.PI * 2,
      });
    }
    fireflyGeo.setAttribute('position', new THREE.BufferAttribute(fireflyPos, 3));

    const fireflyCanvas = document.createElement('canvas');
    fireflyCanvas.width = 32;
    fireflyCanvas.height = 32;
    const ffCtx = fireflyCanvas.getContext('2d');
    if (ffCtx) {
      const grad = ffCtx.createRadialGradient(16, 16, 1, 16, 16, 15);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(160, 255, 180, 0.9)');
      grad.addColorStop(1, 'rgba(100, 255, 160, 0)');
      ffCtx.fillStyle = grad;
      ffCtx.beginPath();
      ffCtx.arc(16, 16, 15, 0, Math.PI * 2);
      ffCtx.fill();
    }
    const fireflyTexture = new THREE.CanvasTexture(fireflyCanvas);

    const fireflyMat = new THREE.PointsMaterial({
      size: 0.65,
      map: fireflyTexture,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: currentPreset.fireflyColor,
    });
    const fireflyParticles = new THREE.Points(fireflyGeo, fireflyMat);
    scene.add(fireflyParticles);
    firefliesParticlesRef.current = fireflyParticles;

    // 10. Mouse/Cursor & Scroll Parallax Handlers
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = nx * 1.8;
      mouseRef.current.targetY = ny * 0.9;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        const nx = (t.clientX / window.innerWidth) * 2 - 1;
        const ny = -(t.clientY / window.innerHeight) * 2 + 1;
        mouseRef.current.targetX = nx * 1.5;
        mouseRef.current.targetY = ny * 0.7;
      }
    };

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth || window.innerWidth;
      const h = containerRef.current.clientHeight || window.innerHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('resize', handleResize);

    // 11. Main Animation Loop (Breathing Camera, Wind Sway, Falling Leaves, Glowing Fireflies)
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Smooth camera parallax interpolation (lerp)
      if (cameraParallaxEnabled) {
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.035;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.035;
      } else {
        mouseRef.current.x += (0 - mouseRef.current.x) * 0.035;
        mouseRef.current.y += (0 - mouseRef.current.y) * 0.035;
      }

      // Gentle organic camera breathing float
      const breathingX = Math.sin(elapsedTime * 0.4) * 0.35;
      const breathingY = Math.cos(elapsedTime * 0.5) * 0.25;

      camera.position.x = breathingX + mouseRef.current.x * 1.5;
      camera.position.y = 3.2 + breathingY + mouseRef.current.y * 0.8;
      camera.lookAt(
        mouseRef.current.x * 0.5,
        3.5 + mouseRef.current.y * 0.4,
        -15
      );

      // Trees & foliage gentle wind sway
      const effectiveWind = windSpeed;
      foliageMeshes.forEach((mesh, idx) => {
        const swayPhase = elapsedTime * 1.2 * effectiveWind + idx * 0.4;
        mesh.rotation.z = Math.sin(swayPhase) * 0.03 * effectiveWind;
        mesh.rotation.x = Math.cos(swayPhase * 0.8) * 0.02 * effectiveWind;
      });

      // Sun rays subtle pulse
      if (sunRaysRef.current) {
        const rayPulse = Math.sin(elapsedTime * 0.6) * 0.08 + 1.0;
        sunRaysRef.current.scale.set(rayPulse, 1, rayPulse);
      }

      // Falling Leaves animation
      if (leavesParticlesRef.current) {
        const pAttr = leavesParticlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
        const array = pAttr.array as Float32Array;

        for (let i = 0; i < leavesCount; i++) {
          const v = leavesVelocities[i];
          // Downward gravity + wind sway
          array[i * 3 + 1] += v.y;
          array[i * 3] += v.x * effectiveWind + Math.sin(elapsedTime * 1.5 + i) * 0.015;
          array[i * 3 + 2] += v.z;

          // Recycle when reaching ground
          if (array[i * 3 + 1] < 0.1) {
            array[i * 3 + 1] = 16 + Math.random() * 4;
            array[i * 3] = (Math.random() - 0.5) * 45;
            array[i * 3 + 2] = (Math.random() - 0.5) * 40;
          }
        }
        pAttr.needsUpdate = true;
      }

      // Fireflies dancing trajectory
      if (firefliesParticlesRef.current) {
        const ffAttr = firefliesParticlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
        const ffArray = ffAttr.array as Float32Array;

        for (let i = 0; i < fireflyCount; i++) {
          const init = fireflyInitPos[i];
          const timeOffset = elapsedTime * 0.8 + init.phase;

          ffArray[i * 3] = init.x + Math.sin(timeOffset * 0.9) * 1.4;
          ffArray[i * 3 + 1] = init.y + Math.sin(timeOffset * 1.3) * 0.8;
          ffArray[i * 3 + 2] = init.z + Math.cos(timeOffset * 0.7) * 1.4;
        }
        ffAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup on unmount or re-render
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [atmosphere, isPanicOrCamouflage, windSpeed, cameraParallaxEnabled]);

  // Procedural Web Audio Ambient Forest Sound Synthesizer (Wind, Gentle River, Birds)
  const startForestAudio = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // 1. Wind noise generator (Pink Noise with Bandpass filter)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const windFilter = ctx.createBiquadFilter();
      windFilter.type = 'bandpass';
      windFilter.frequency.setValueAtTime(320, ctx.currentTime);
      windFilter.Q.setValueAtTime(1.8, ctx.currentTime);

      const windGain = ctx.createGain();
      windGain.gain.setValueAtTime((soundVolume / 100) * 0.35, ctx.currentTime);
      windGainRef.current = windGain;

      whiteNoise.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(ctx.destination);
      whiteNoise.start();

      // Slow LFO for gentle wind swell
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.12, ctx.currentTime);
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(180, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(windFilter.frequency);
      lfo.start();

      // 2. Distant Forest Bird Chirp scheduler
      const scheduleBirdChirp = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const now = audioCtxRef.current.currentTime;
        const osc = audioCtxRef.current.createOscillator();
        const bGain = audioCtxRef.current.createGain();

        const baseFreq = 2200 + Math.random() * 1200;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.exponentialRampToValueAtTime(baseFreq + 600, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(baseFreq - 300, now + 0.18);

        bGain.gain.setValueAtTime(0.001, now);
        bGain.gain.linearRampToValueAtTime((soundVolume / 100) * 0.08, now + 0.04);
        bGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

        osc.connect(bGain);
        bGain.connect(audioCtxRef.current.destination);

        osc.start(now);
        osc.stop(now + 0.28);

        const nextDelay = 4000 + Math.random() * 8000;
        birdTimerRef.current = window.setTimeout(scheduleBirdChirp, nextDelay);
      };

      birdTimerRef.current = window.setTimeout(scheduleBirdChirp, 3000);
      setIsForestSoundActive(true);
    } catch (e) {
      console.warn('Web Audio start notice:', e);
    }
  }, [soundVolume]);

  const stopForestAudio = useCallback(() => {
    if (birdTimerRef.current) {
      clearTimeout(birdTimerRef.current);
      birdTimerRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsForestSoundActive(false);
  }, []);

  const toggleForestAudio = () => {
    if (isForestSoundActive) {
      stopForestAudio();
    } else {
      startForestAudio();
    }
  };

  useEffect(() => {
    if (isPanicOrCamouflage && isForestSoundActive) {
      stopForestAudio();
    }
  }, [isPanicOrCamouflage, isForestSoundActive, stopForestAudio]);

  return (
    <>
      {/* 3D WebGL Forest Canvas Container */}
      <div
        id="peaceful-forest-3d-canvas-container"
        ref={containerRef}
        className={`fixed inset-0 pointer-events-none -z-30 overflow-hidden select-none transition-opacity duration-1000 ${
          isPanicOrCamouflage ? 'opacity-0 invisible' : 'opacity-100 visible'
        }`}
        aria-hidden="true"
      />

      {/* Floating Forest Ambience Controller (Bottom Left) */}
      {!isPanicOrCamouflage && (
        <div
          id="forest-ambience-control-bar"
          className="fixed bottom-4 left-4 z-40 flex flex-col items-start gap-2 font-sans"
        >
          {/* Expanded Forest Settings Panel */}
          {showForestControls && (
            <div
              className={`p-4 rounded-2xl shadow-2xl border text-xs w-76 sm:w-84 space-y-3.5 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-200 ${
                isNightMode || atmosphere === 'night'
                  ? 'bg-[#0F172A]/90 border-[#334155] text-[#F8FAFC]'
                  : 'bg-white/90 border-[#CBD5E1] text-[#0F172A]'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b pb-2.5 border-inherit/30">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#15803D]/20 text-[#15803D]">
                    <Trees className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs">Sanctuaire 3D Forêt Vivante</h4>
                    <p className="text-[10px] opacity-75">Immersion & Profondeur Réelle</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowForestControls(false)}
                  className="text-xs opacity-60 hover:opacity-100 p-1 rounded-md"
                >
                  ✕
                </button>
              </div>

              {/* Atmosphere Presets */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold flex items-center gap-1.5 opacity-90">
                  <Sparkles className="w-3.5 h-3.5 text-[#15803D]" />
                  Atmosphère & Lumière du Jour
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['morning', 'noon', 'dusk', 'night'] as ForestAtmosphere[]).map((atm) => {
                    const preset = atmospherePresets[atm];
                    const isSelected = atmosphere === atm;
                    return (
                      <button
                        key={atm}
                        type="button"
                        onClick={() => setAtmosphere(atm)}
                        className={`p-2 rounded-xl text-[11px] font-medium border text-left flex items-center gap-2 transition-all ${
                          isSelected
                            ? 'bg-[#15803D] text-white border-[#15803D] shadow-xs'
                            : 'bg-black/5 hover:bg-black/10 border-inherit/30'
                        }`}
                      >
                        <span className="text-base">{preset.icon}</span>
                        <span className="truncate">{preset.name.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Wind Speed Slider */}
              <div className="space-y-1 bg-black/5 p-2.5 rounded-xl border border-inherit/25">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-medium flex items-center gap-1">
                    <Wind className="w-3.5 h-3.5 text-[#15803D]" />
                    Brise & Mouvement des Feuilles
                  </span>
                  <span className="font-bold text-[#15803D]">
                    {windSpeed === 0 ? 'Calme plat' : windSpeed <= 1 ? 'Brise douce' : 'Vent vivifiant'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2.2"
                  step="0.2"
                  value={windSpeed}
                  onChange={(e) => setWindSpeed(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#CBD5E1]/40 rounded-lg appearance-none cursor-pointer accent-[#15803D]"
                />
              </div>

              {/* Parallax Toggle */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-black/5 border border-inherit/25 text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#15803D]" />
                  Profondeur & Parallaxe Curseur
                </span>
                <button
                  type="button"
                  onClick={() => setCameraParallaxEnabled(!cameraParallaxEnabled)}
                  className={`px-2.5 py-1 rounded-lg font-semibold text-[10px] transition-colors ${
                    cameraParallaxEnabled
                      ? 'bg-[#15803D] text-white'
                      : 'bg-black/10 text-inherit opacity-75'
                  }`}
                >
                  {cameraParallaxEnabled ? 'Actif' : 'Fixe'}
                </button>
              </div>

              {/* Ambient Forest Sound Generator (Web Audio) */}
              <div className="space-y-2 p-2.5 rounded-xl bg-black/5 border border-inherit/25">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-medium flex items-center gap-1.5">
                    {isForestSoundActive ? (
                      <Volume2 className="w-3.5 h-3.5 text-[#15803D]" />
                    ) : (
                      <VolumeX className="w-3.5 h-3.5 opacity-60" />
                    )}
                    Sons Naturels de Forêt (Vent, Oiseaux, Ruisseau)
                  </span>
                  <button
                    type="button"
                    onClick={toggleForestAudio}
                    className={`px-2 py-0.5 rounded-md font-bold text-[10px] transition-colors ${
                      isForestSoundActive
                        ? 'bg-[#15803D] text-white'
                        : 'bg-black/10 text-inherit hover:bg-black/20'
                    }`}
                  >
                    {isForestSoundActive ? 'Activé' : 'Activer'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Floating Forest Pill Button */}
          <div className="flex items-center gap-1.5 bg-white/85 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-[#CBD5E1] text-xs text-[#0F172A] transition-all hover:bg-white">
            <div className="w-6 h-6 rounded-full bg-[#DCFCE7] text-[#15803D] flex items-center justify-center shrink-0">
              <Trees className="w-3.5 h-3.5 animate-pulse" />
            </div>

            <span className="font-bold text-[11px] pr-1">
              Forêt 3D • {atmospherePresets[atmosphere].name.split(' ')[0]}
            </span>

            <button
              type="button"
              onClick={toggleForestAudio}
              className={`p-1.5 rounded-full transition-colors ${
                isForestSoundActive
                  ? 'bg-[#15803D] text-white'
                  : 'hover:bg-[#DCFCE7] text-[#15803D]'
              }`}
              title={isForestSoundActive ? 'Couper le son de la forêt' : 'Activer la brise et les oiseaux de forêt'}
            >
              {isForestSoundActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 opacity-75" />}
            </button>

            <button
              type="button"
              onClick={() => setShowForestControls(!showForestControls)}
              className={`p-1.5 rounded-full transition-colors ${
                showForestControls ? 'bg-[#15803D] text-white' : 'hover:bg-[#DCFCE7] text-[#334155]'
              }`}
              title="Personnaliser l'atmosphère 3D de la forêt"
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
