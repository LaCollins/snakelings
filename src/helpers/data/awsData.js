// import axios from 'axios';
import S3 from 'react-aws-s3';

import apiKeys from '../apiKeys.json';

const config = apiKeys.awsKeys;

const ReactS3Client = new S3(config);

const uploadImage = (newFileName) => {
  ReactS3Client
    .uploadFile(newFileName)
    .then((data) => console.error(data))
    .catch((err) => console.error(err));
};

export default { uploadImage };
