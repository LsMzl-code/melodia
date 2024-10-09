import { Inject, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

import streamifier from 'streamifier';
import { CloudinaryResponse } from './cloudinary-response';


@Injectable()
export class CloudinaryService {

  //*** AJOUT D'UNE IMAGE ***//
  async uploadImage(file: Express.Multer.File): Promise<CloudinaryResponse> {
    if(!file) {
      throw new Error('Aucun fichier fourni');
    }
    return new Promise<CloudinaryResponse>((resolve, reject) => {
     const uploadstream = cloudinary.uploader.upload_stream(
        {folder: 'melodia_avatars'},
        (error, result) => {
        if (error) return reject(error);
        resolve(result);
      })

      if(!file || !file.buffer) {
        reject(new Error('Aucun fichier fourni'));
      }

      uploadstream.end(file.buffer);
    });
  }

  //*** RECUPERATION D'UNE IMAGE ***//
  async getImage(publicId: string) {
    return cloudinary.url(publicId, { crop: 'scale' }); // Retourne l'URL de l'image
  }

  //*** SUPPRESSION D'UNE IMAGE ***//
  async deleteImage(publicId: string) {
    return cloudinary.uploader.destroy(publicId);
  }
}
