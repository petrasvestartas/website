<template>
  <div ref="threeContainer" class="three-container"></div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

export default {
  props: ['modelUrl'],
  mounted() {
    this.initThreeJS();
  },
  methods: {
    initThreeJS() {
      const container = this.$refs.threeContainer;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setClearColor(0xffffff); // Set background color to white
      container.appendChild(renderer.domElement);

      // Add OrbitControls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true; // Enable damping (inertia)
      controls.dampingFactor = 0.25; // Damping factor
      controls.screenSpacePanning = false; // Disable panning in screen space
      controls.minDistance = 1; // Minimum zoom distance
      controls.maxDistance = 100; // Maximum zoom distance

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update(); // Update controls
        renderer.render(scene, camera);
      };

      if (this.modelUrl) {
        // Load the 3D model using OBJLoader
        const loader = new OBJLoader();
        loader.load(this.modelUrl, (obj) => {
          scene.add(obj);

          // Compute the bounding box of the object
          const box = new THREE.Box3().setFromObject(obj);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());

          // Adjust the camera position and controls to fit the object
          const maxDim = Math.max(size.x, size.y, size.z);
          const fov = camera.fov * (Math.PI / 180);
          let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));

          cameraZ *= 1.5; // Add some distance to fit the object nicely
          camera.position.set(center.x, center.y, cameraZ);
          camera.lookAt(center);

          controls.target.set(center.x, center.y, center.z);
          controls.update();

          animate();
        }, undefined, (error) => {
          console.error('An error happened', error);
          this.renderFallbackCube(scene, animate);
        });
      } else {
        this.renderFallbackCube(scene, animate);
      }
    },
    renderFallbackCube(scene, animate) {
      // Fallback: Render a cube
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0xD3D3D3 }); // Light grey color for the model
      const cube = new THREE.Mesh(geometry, material);

      // Create edges for the mesh
      const edges = new THREE.EdgesGeometry(geometry);
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 }); // Black color for the edges
      const line = new THREE.LineSegments(edges, lineMaterial);

      // Add edges as a child of the cube
      cube.add(line);

      scene.add(cube);

      animate();
    }
  },
};
</script>

<style scoped>
.three-container {
  width: 100%;
  height: 100vh; /* Adjust the height to fill the viewport */
  position: relative;
}
</style>