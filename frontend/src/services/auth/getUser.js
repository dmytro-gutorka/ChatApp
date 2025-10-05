import { apiPaths } from '../../config/apiPaths';
import { axiosInstance } from '../../config/axiosInstance';

export default async function getUser(v) {
  const url = apiPaths.auth.getUser();
  const response = await axiosInstance.get(url);

  return response?.data.user;
}
