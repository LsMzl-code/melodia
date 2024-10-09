import { z } from "zod";

// export const UploadAvatarSchema = z.object({
//   imgUrl: z.object({
//     name: z.string(),
//     size: z.number().max(15000000), // maw 15MB
//     type: z.enum(['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml', 'image/gif']).nullable()
//   })
// })
export const UploadAvatarSchema = z.object({
  file: z.any()
})
