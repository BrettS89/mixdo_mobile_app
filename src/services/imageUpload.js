import { RNS3 } from 'react-native-aws3';
import { apiGetAwsData } from '../lib/api_calls';

export const imageUpload = async ({ file, type }) => {
  try {
    const { awsData: { 
      bucket, 
      accessKey, 
      secretKey,
      fileName
    } 
  } = await apiGetAwsData(type);
    const image = {
      uri: file.uri,
      name: fileName,
      type: `image/${type}`,
    };

    let options = {
      keyPrefix: "uploads/",
      bucket: bucket,
      region: "us-east-1",
      accessKey: accessKey,
      secretKey: secretKey,
      successActionStatus: 201
    };

    // return RNS3.put(image, options).then(response => {
    //   if (response.status !== 201)
    //     throw new Error("Failed to upload image to S3");
    //   return response.body.postResponse.location;
    // });

    const uploadedImage = await RNS3.put(image, options);
    if(uploadedImage.status !== 201) {
      throw new Error('Failed to upload image to S3');
    }
    return uploadedImage.body.postResponse.location;
  }
  catch(e) {
    console.log(e);
  }
};
