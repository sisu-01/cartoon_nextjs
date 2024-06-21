import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
  return (
    <div className="d-flex h-100 align-items-center justify-content-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loading;