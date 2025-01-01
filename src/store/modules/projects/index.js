import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  projects: [
    {
      id: 'c1',
      title: 'Maximilian',
      authors: 'Maximilian Schwarzmüller',
      date: '2023-01-01',
      location: 'Vienna',
      types: ['architecture', 'prototypes', 'research'],
      descriptions: [
        "I'm Maximilian and I've worked as a freelance web developer for years.",
        "Let me help you become a developer as well!"
      ],
      urls: ['https://example.com/maximilian'],
      imageUrl: 'https://payload.cargocollective.com/1/20/653920/14025941/image13_o.jpg',
      figureUrls: [
        'https://payload.cargocollective.com/1/20/653920/14025941/figure1.jpg',
        'https://payload.cargocollective.com/1/20/653920/14025941/figure2.jpg'
      ]
    },
    {
      id: 'c2',
      title: 'Julie',
      authors: 'Julie Doe',
      date: '2023-02-01',
      location: 'Berlin',
      types: ['architecture', 'research'],
      descriptions: [
        'I am Julie and as a senior developer in a big tech company,',
        'I can help you get your first job or progress in your current one.'
      ],
      urls: ['https://example.com/julie'],
      imageUrl: 'https://payload.cargocollective.com/1/20/653920/13929541/1_2880.jpg',
      figureUrls: [
        'https://payload.cargocollective.com/1/20/653920/13929541/figure1.jpg',
        'https://payload.cargocollective.com/1/20/653920/13929541/figure2.jpg'
      ]
    }
  ]
};


export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};