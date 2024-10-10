import { z } from "zod";

export const UploadAvatarSchema = z.object({
  imgUrl: z.any()
})
