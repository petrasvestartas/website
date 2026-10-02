// Content of the Code page. Edit this file to add or reorder entries.
// Stars and commit counts were taken from GitHub in October 2026; update them by hand.

const IMAGES = 'https://raw.githubusercontent.com/petrasvestartas/storage/refs/heads/main/images/code/';

export const profile = {
  github: 'https://github.com/petrasvestartas',
  sponsor: 'https://github.com/sponsors/petrasvestartas',
  summary: 'Open-source tools for geometry processing, digital fabrication and engineering, written in C++, Python, Rust and C#.',
  languages: ['C++', 'Python', 'Rust', 'C#'],
  stack: ['Rhino', 'Grasshopper', 'COMPAS', 'CGAL', 'OpenCASCADE', 'WebGPU', 'nanobind', 'CMake', 'Protobuf', 'conda-forge'],
};

// Own projects, shown as large cards.
export const featured = [
  {
    title: 'wood',
    subtitle: 'Timber joinery stack',
    description: 'Finds where timber plates touch, chooses which joints fit there and cuts them into both plates. A C++ core with nanobind bindings and a COMPAS wrapper, used for joinery research and fabrication.',
    languages: ['C++', 'Python'],
    stars: 49,
    imageUrl: IMAGES + 'compas_wood.png',
    links: [
      { label: 'compas_wood', url: 'https://github.com/petrasvestartas/compas_wood' },
      { label: 'Documentation', url: 'https://petrasvestartas.github.io/compas_wood/' },
      { label: 'wood (C++)', url: 'https://github.com/petrasvestartas/wood' },
      { label: 'wood_nano', url: 'https://github.com/petrasvestartas/wood_nano' },
    ],
  },
  {
    title: 'OpenNest',
    subtitle: '2D nesting',
    description: 'Irregular 2D nesting of polylines with holes into sheets with holes, for Rhino and Grasshopper. The C++ engines are shared with the COMPAS package compas_nest.',
    languages: ['C#', 'C++'],
    stars: 60,
    imageUrl: IMAGES + 'opennest.png',
    links: [
      { label: 'GitHub', url: 'https://github.com/petrasvestartas/OpenNest' },
      { label: 'Documentation', url: 'https://petrasvestartas.github.io/OpenNest/' },
      { label: 'food4rhino', url: 'https://www.food4rhino.com/en/app/opennest' },
      { label: 'compas_nest', url: 'https://github.com/petrasvestartas/compas_nest' },
    ],
  },
  {
    title: 'session',
    subtitle: 'Geometry kernel',
    description: 'One geometry kernel written in C++, Python and Rust with the same API, the same protobuf schemas and the same tests in every language. Meshes, NURBS, BReps and a WebGPU viewer.',
    languages: ['C++', 'Python', 'Rust'],
    stars: 3,
    imageUrl: null,
    links: [
      { label: 'GitHub', url: 'https://github.com/petrasvestartas/session' },
      { label: 'Documentation', url: 'https://petrasvestartas.github.io/session/' },
    ],
  },
  {
    title: 'NGon',
    subtitle: 'Polygonal mesh processing',
    description: 'Polygonal (n-gon) mesh processing for Grasshopper, installed through the Rhino package manager.',
    languages: ['C#'],
    stars: 14,
    imageUrl: IMAGES + 'ngon.png',
    links: [
      { label: 'GitHub', url: 'https://github.com/petrasvestartas/NGon' },
      { label: 'food4rhino', url: 'https://www.food4rhino.com/en/app/ngon' },
    ],
  },
];

// Contributions to team and open-source projects, grouped by organisation.
export const contributions = [
  {
    organisation: 'COMPAS',
    url: 'https://compas.dev',
    description: 'Computational framework for architecture, engineering and fabrication.',
    repositories: [
      { name: 'compas_cgal', url: 'https://github.com/compas-dev/compas_cgal', description: 'Python bindings for CGAL algorithms, built with nanobind and published on PyPI and conda-forge.', languages: ['C++', 'Python'], stars: 32, commits: 107 },
      { name: 'compas_occt', url: 'https://github.com/petrasvestartas/compas_occt', description: 'OpenCASCADE geometry backend, published on PyPI.', languages: ['C++', 'Python'], stars: 2, commits: null },
      { name: 'compas_libigl', url: 'https://github.com/compas-dev/compas_libigl', description: 'libigl bindings.', languages: ['C++', 'Python'], stars: 5, commits: 30 },
      { name: 'compas_nanobind_package_template', url: 'https://github.com/compas-dev/compas_nanobind_package_template', description: 'Template for COMPAS C++ extensions.', languages: ['C++', 'Python'], stars: 2, commits: 17 },
      { name: 'compas_shapeop', url: 'https://github.com/compas-dev/compas_shapeop', description: 'ShapeOp bindings.', languages: ['C++', 'Python'], stars: 3, commits: 13 },
      { name: 'compas', url: 'https://github.com/compas-dev/compas', description: 'The main COMPAS library.', languages: ['Python'], stars: 385, commits: 12 },
    ],
  },
  {
    organisation: 'Block Research Group, ETH Zürich',
    url: 'https://block.arch.ethz.ch',
    description: 'Structural design, form finding and fabrication research.',
    repositories: [
      { name: 'compas_grid', url: 'https://github.com/BRG-research/compas_grid', description: 'Grid structures for multi-storey buildings.', languages: ['Python'], stars: 0, commits: 182 },
      { name: 'compas_model', url: 'https://github.com/BlockResearchGroup/compas_model', description: 'Model datastructure for design, analysis and fabrication.', languages: ['Python'], stars: 10, commits: 144 },
      { name: 'compas-RV', url: 'https://github.com/BlockResearchGroup/compas-RV', description: 'RhinoVAULT: form finding with reciprocal diagrams.', languages: ['Python'], stars: 16, commits: 108 },
      { name: 'compas_lmgc90', url: 'https://github.com/BlockResearchGroup/compas_lmgc90', description: 'LMGC90 contact solver wrapper.', languages: ['C++', 'Python'], stars: 2, commits: 66 },
      { name: 'compas_cra', url: 'https://github.com/BlockResearchGroup/compas_cra', description: 'Coupled rigid-block analysis.', languages: ['Python'], stars: 22, commits: 49 },
      { name: 'compas_cnc', url: 'https://github.com/BRG-research/compas_cnc', description: 'Subtractive fabrication operations.', languages: ['Python'], stars: 3, commits: 28 },
      { name: 'compas_3dec', url: 'https://github.com/BlockResearchGroup/compas_3dec', description: 'Discrete element modelling with Itasca 3DEC.', languages: ['Python'], stars: 3, commits: 10 },
    ],
  },
  {
    organisation: 'IBOIS, EPFL',
    url: 'https://www.epfl.ch/labs/ibois/',
    description: 'Laboratory for Timber Constructions.',
    repositories: [
      { name: 'Cockroach', url: 'https://github.com/ibois-epfl/Cockroach', description: 'Point cloud processing and meshing for Rhino, using CGAL, Open3D and Cilantro.', languages: ['C++', 'C#'], stars: 8, commits: 56 },
      { name: 'COMPAS_ABB6700_IRBT', url: 'https://github.com/ibois-epfl/COMPAS_ABB6700_IRBT', description: 'ABB IRB6700 robot on a linear track.', languages: ['Python', 'ROS'], stars: 1, commits: 28 },
      { name: 'Raccoon-ibois', url: 'https://github.com/ibois-epfl/Raccoon-ibois', description: 'CNC toolpath generation.', languages: ['C#'], stars: 4, commits: 7 },
    ],
  },
];

// Rhino and Grasshopper plugins not shown above.
export const plugins = [
  { title: 'Fox', description: 'Graph and aggregation methods.', languages: ['C#'], imageUrl: IMAGES + 'fox.png', url: 'https://www.food4rhino.com/en/app/fox' },
  { title: 'Cockroach', description: 'Point cloud processing with CGAL, Cilantro and Open3D.', languages: ['C++', 'C#'], imageUrl: IMAGES + 'cockroach.png', url: 'https://www.food4rhino.com/en/app/cockroach' },
  { title: 'Raccoon', description: 'G-code for 5-axis CNC.', languages: ['C#'], imageUrl: IMAGES + 'raccoon.png', url: 'https://github.com/petrasvestartas/Raccoon' },
  { title: 'Mesh Curvature', description: 'Triangle mesh curvature analysis.', languages: ['C#'], imageUrl: IMAGES + 'mesh_curvature.png', url: 'https://www.food4rhino.com/en/app/mesh-curvature' },
  { title: 'Scatter', description: 'Instancing for large numbers of elements.', languages: ['C#'], imageUrl: IMAGES + 'scatter.png', url: 'https://www.food4rhino.com/en/app/scatter' },
];

// Smaller libraries, shown as a compact list.
export const libraries = [
  { name: 'boundary_first_flattening_rhino', url: 'https://github.com/petrasvestartas/boundary_first_flattening_rhino', description: 'Boundary First Flattening for Rhino and Grasshopper.', languages: ['C#'], stars: 11 },
  { name: 'compas_nest', url: 'https://github.com/petrasvestartas/compas_nest', description: 'Python bindings for the OpenNest engines.', languages: ['C++', 'Python'], stars: 0 },
  { name: 'nest', url: 'https://github.com/petrasvestartas/nest', description: 'C++ 2D irregular nesting engines.', languages: ['C++'], stars: 2 },
  { name: 'compas_manifold', url: 'https://github.com/petrasvestartas/compas_manifold', description: 'Guaranteed-manifold mesh booleans with Manifold.', languages: ['C++', 'Python'], stars: 0 },
  { name: 'wgpu_viewer', url: 'https://github.com/petrasvestartas/wgpu_viewer', description: 'Cross-platform WebGPU geometry viewer.', languages: ['Rust'], stars: 0 },
];
