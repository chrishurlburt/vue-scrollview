export default [
  {
    name: 'Web Development',
    key: 's1',
    children: [
      { name: 'Front-end', key: 's1c1' },
      { name: 'Back-end', key: 's1c2' },
      { name: 'Dev ops', key: 's1c3' },
      { name: 'Engineering Manager', key: 's1c4' }
    ]
  },
  {
    name: 'Frameworks',
    key: 's2',
    children: [
      {
        name: 'JavaScript',
        key: 's2c1',
        children: [
          { name: 'Vue.js', key: 's2c1c1' },
          { name: 'React.js', key: 's2c1c2' },
          { name: 'Angular.js', key: 's2c1c3' }
        ]
      },
      {
        name: 'CSS',
        key: 's2c2',
        children: [
          { name: 'Foundation', key: 's2c2c1' },
          { name: 'Bootstrap', key: 's2c2c2' }
        ]
      }
    ]
  },
  {
    name: 'Programming Languages',
    key: 's3',
    children: [
      { name: 'JavaScript', key: 's3c1' },
      { name: 'Python', key: 's3c2' },
      { name: 'Rust', key: 's3c3' },
      { name: 'Ruby', key: 's3c4' }
    ]
  }
]
