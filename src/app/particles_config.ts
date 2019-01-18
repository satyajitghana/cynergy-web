export default {
  particles: {
    number: {
      'value': 60,
      'density': {
        'enable': true,
        'value_area': 1000
      }
    },
    color: {
      'value': '#c0392b'
    },
    shape: {
      'type': 'circle',
      'stroke': {
        'width': 0,
        'color': '#000000'
      },
      'polygon': {
        'nb_sides': 2
      }
    },
    opacity: {
      'value': 0.5,
      'random': false,
      'anim': {
        'enable': false,
        'speed': 1,
        'opacity_min': 0.1,
        'sync': false
      }
    },
    size: {
      'value': 8,
      'random': true,
      'anim': {
        'enable': true,
        'speed': 5,
        'size_min': 0.1,
        'sync': false
      }
    },
    line_linked: {
      'enable': true,
      'distance': 200,
      'color': '#ffffff',
      'opacity': 0.4,
      'width': 1
    },
    move: {
      'enable': true,
      'speed': 2,
      'direction': 'none',
      'random': false,
      'straight': false,
      'out_mode': 'out',
      'attract': {
        'enable': false,
        'rotateX': 600,
        'rotateY': 1200
      }
    }
  },
  interactivity: {
    'detect_on': 'canvas',
    'events': {
      'onhover': {
        'enable': true,
        'mode': 'grab'
      },
      onclick: {
        'enable': true,
        'mode': 'push'
      },
      'resize': true,
      onresize: {
        'enable': true,
        'density_auto': true,
        'density_area': 1000
      }
    },
    modes: {
      'grab': {
        'distance': 300,
        'line_linked': {
          'opacity': 1
        }
      },
      bubble: {
        'distance': 400,
        'size': 40,
        'duration': 2,
        'opacity': 0.8,
        'speed': 1
      },
      repulse: {
        'distance': 200
      },
      push: {
        'particles_nb': 4
      },
      remove: {
        'particles_nb': 2
      }
    }
  },
  retina_detect: true,
  config_demo: {
    'hide_card': false,
    'background_color': '#b61924',
    'background_image': '',
    'background_position': '50% 50%',
    'background_repeat': 'no-repeat',
    'background_size': 'cover'
  }
};
