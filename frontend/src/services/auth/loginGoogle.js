import { SERVER_URL } from '../../config/constants';

export default function loginGoogle() {
  window.location.href = `${SERVER_URL}/api/v1/auth/google`;
}
