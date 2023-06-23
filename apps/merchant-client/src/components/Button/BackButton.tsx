import { useLocation, useNavigate, } from 'react-router';

export const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // const visible = location.pathname.includes('merchant/');
  const visible = true;

  const handleClick = () => navigate(-1);

  return (
    <div
      className={`app-back ${visible ? 'app-back--visible' : ''}`}
      onClick={handleClick}
    >
      Back
    </div>
  );
}


