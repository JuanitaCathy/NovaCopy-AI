import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Spaceship: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Set up the scene, camera, and renderer
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0a0a1a); // Near black navy background

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 10;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        // Create spaceship geometry (simple cone for the spaceship body)
        const spaceshipGeometry = new THREE.ConeGeometry(1, 3, 32); // Cone for the body

        // Set up vertex colors
        const colors = new Float32Array(spaceshipGeometry.attributes.position.count * 3); // Array to hold the colors
        const color = new THREE.Color();

        for (let i = 0; i < spaceshipGeometry.attributes.position.count; i++) {
            // Create a gradient from light blue to light pink
            color.setHSL(i / spaceshipGeometry.attributes.position.count, 0.5, 0.7);
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        spaceshipGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const spaceshipMaterial = new THREE.MeshPhongMaterial({
            vertexColors: true, // Enable vertex colors
            emissive: 0x222222,
            flatShading: true
        });

        const spaceship = new THREE.Mesh(spaceshipGeometry, spaceshipMaterial);
        spaceship.position.y = 1;
        scene.add(spaceship);

        // Add light sources
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5).normalize();
        scene.add(light);

        const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
        light2.position.set(-5, -5, -5).normalize();
        scene.add(light2);

        // Render the scene
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotate the spaceship for a dynamic effect
            spaceship.rotation.y += 0.01;

            renderer.render(scene, camera);
        };
        animate();

        // Responsive resizing
        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} />;
};

export default Spaceship;
