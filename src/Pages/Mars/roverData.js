export const roverData = [
  {
    name: 'Curiosity',
    status: 'active',
    img: 'https://mars.nasa.gov/system/feature_items/images/6037_msl_banner.jpg',
    landing_date: '2012-08-06',
  },
  {
    name: 'Spirit',
    status: 'complete',
    img: 'https://d2pn8kiwq2w21t.cloudfront.net/original_images/missionswebmer.jpg',
    landing_date: '2004-01-04',
  },
  {
    name: 'Opportunity',
    status: 'complete',
    img: 'https://solarsystem.nasa.gov/system/content_pages/main_images/1057_1057_rover2_768.jpg',
    landing_date: '2004-01-25',
  },
  {
    name: 'Perseverance',
    status: 'active',
    img: 'https://images.theconversation.com/files/384291/original/file-20210215-19-s5qrjf.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop',
    landing_date: '2004-01-25',
  },
]

export const roverCameraData = {
  spirit: {
    max_sol: 2208,
    cameras: [
      {
        name: 'FHAZ',
        full_name: 'Front Hazard Avoidance Camera',
      },
      {
        name: 'NAVCAM',
        full_name: 'Navigation Camera',
      },
      {
        name: 'PANCAM',
        full_name: 'Panoramic Camera',
      },
      {
        name: 'MINITES',
        full_name: 'Miniature Thermal Emission Spectrometer (Mini-TES)',
      },
      {
        name: 'ENTRY',
        full_name: 'Entry, Descent, and Landing Camera',
      },
      {
        name: 'RHAZ',
        full_name: 'Rear Hazard Avoidance Camera',
      },
    ],
  },
  opportunity: {
    max_sol: 5111,
    cameras: [
      {
        name: 'FHAZ',
        full_name: 'Front Hazard Avoidance Camera',
      },
      {
        name: 'NAVCAM',
        full_name: 'Navigation Camera',
      },
      {
        name: 'PANCAM',
        full_name: 'Panoramic Camera',
      },
      {
        name: 'MINITES',
        full_name: 'Miniature Thermal Emission Spectrometer (Mini-TES)',
      },
      {
        name: 'ENTRY',
        full_name: 'Entry, Descent, and Landing Camera',
      },
      {
        name: 'RHAZ',
        full_name: 'Rear Hazard Avoidance Camera',
      },
    ],
  },
}
