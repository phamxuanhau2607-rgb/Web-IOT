export const MOCK_USER = {
  name: "Doãn Tuấn",
  id: "user_01",
  avatar: "https://ui-avatars.com/api/?name=Doan+Tuan&background=0D8ABC&color=fff"
};

export const DEVICE_TYPES = {
  LIGHT: 'light',
  FAN: 'fan',
  PLUG: 'plug',
  TV: 'tv',
  AC: 'ac',
  SENSOR: 'sensor'
};

export const INITIAL_SPACES = [
  {
    id: 'space_01',
    name: 'My Sweet Home',
    type: 'Home',
    rooms: [
      {
        id: 'room_01',
        name: 'Living Room',
        area: 45,
        devices: [
          {
            id: 'dev_01',
            name: 'Ceiling Light',
            type: DEVICE_TYPES.LIGHT,
            isOn: false,
            isDimmed: true, // "Dimmed" means visualy disabled/inactive for verify scope
            isReal: false
          },
          {
            id: 'dev_02',
            name: 'Sony Bravia TV',
            type: DEVICE_TYPES.TV,
            isOn: false,
            isDimmed: true,
            isReal: false
          },
          {
            id: 'dev_03',
            name: 'Smart Plug (Relay)',
            type: DEVICE_TYPES.PLUG,
            isOn: true,
            isDimmed: false, // Highlighted!
            isReal: true // This connects to real API
          }
        ]
      },
      {
        id: 'room_02',
        name: 'Kitchen',
        area: 20,
        devices: [
          {
            id: 'dev_04',
            name: 'Microwave',
            type: DEVICE_TYPES.PLUG,
            isOn: false,
            isDimmed: true,
            isReal: false
          }
        ]
      },
      {
        id: 'room_03',
        name: 'Master Bedroom',
        area: 30,
        devices: [
          {
            id: 'dev_05',
            name: 'Air Conditioner',
            type: DEVICE_TYPES.AC,
            isOn: false,
            isDimmed: true,
            isReal: false
          }
        ]
      }
    ]
  }
];
