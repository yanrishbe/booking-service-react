export default class RoomsService {
    API_BASE = 'url';

    getResource = async (url) => {
      const resp = await fetch(url);
      let body;
      if (resp.ok) {
        body = await resp.json();
      } else {
        body = [{
          url: 'https://q-cf.bstatic.com/images/hotel/max1024x768/243/243128320.jpg',
          stars: 2,
          mark: 8.8,
          isVip: false,
          persons: 2,
          cost: 60,
        },
        {
          url: 'https://q-cf.bstatic.com/images/hotel/max1024x768/239/239757851.jpg',
          stars: 3,
          mark: 8.7,
          isVip: false,
          persons: 2,
          cost: 90,
        },
        {
          url: 'https://q-cf.bstatic.com/images/hotel/max1280x900/159/159238010.jpg',
          stars: 3,
          mark: 8.6,
          isVip: false,
          persons: 3,
          cost: 85,
        },
        ];
      }
      return body;
    };

    getAllRooms = async () => {
      let result = await this.getResource(`${API_BASE}`);

      return result;
    }
}
