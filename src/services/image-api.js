import axios from 'axios';

const fetchHits = ({ searchQuery = [], currentPage = 1, pageSize = 12 }) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=19822283-ed0faee6ad1fffca99be2e04e&image_type=photo&orientation=horizontal&per_page=${pageSize}`,
    )
    .then(response => response.data.hits);
};

export default { fetchHits };
