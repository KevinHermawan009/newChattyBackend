import cloudinary, {UploadApiErrorResponse, UploadApiResponse} from 'cloudinary';
import Logger from 'bunyan';
import { config } from '@root/config';

const log: Logger = config.createLogger('cloudinary-upload');
export function uploads(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean
): Promise<UploadApiErrorResponse | UploadApiResponse | undefined>{
  return new Promise ((resolve)=>{
    cloudinary.v2.uploader.upload(
      file,
      {
        public_id: public_id,
        overwrite: overwrite,
        invalidate: invalidate
      },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined)=>{
        if(error) resolve(error);
        resolve(result);
        log.error(result, error);
      }
      );
  })
}
