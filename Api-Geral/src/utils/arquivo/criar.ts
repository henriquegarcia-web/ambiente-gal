import Jimp from "jimp";
import { unlink } from "fs/promises";
import fs from "fs";

export const Arquivo = async (imagem: any) => {
  return new Promise(async (resolve, reject) => {
    let nome = "";
    if (imagem?.mimetype == "image/png") {
      nome = `${imagem.filename}.png`;

      const image = await Jimp.read(imagem.path);
      await image.writeAsync(`./public/arquivo/${imagem.filename}.png`);
      await unlink(`./tmp/${imagem.filename}`);
    }
    if (imagem?.mimetype == "image/jpg" || imagem?.mimetype == "image/jpeg") {
      nome = `${imagem.filename}.png`;

      const image = await Jimp.read(imagem.path);
      await image.writeAsync(`./public/arquivo/${imagem.filename}.png`);
      await unlink(`./tmp/${imagem.filename}`);
    }
    const allowedVideoMimes = ["video/mp4", "video/webm", "video/ogg"];
    if (allowedVideoMimes.includes(imagem?.mimetype)) {
      nome = `${imagem.filename}.mp4`;
      var oldPath = "./tmp/" + imagem.filename;
      var newPath = "public/arquivo/" + nome;
      fs.rename(oldPath, newPath, async function (err) {
        if (err) {
          throw err;
        }
      });
    }
    if (imagem.mimetype == "application/pdf") {
      nome = `${imagem.filename}.pdf`;

      var oldPath = "./tmp/" + imagem.filename;
      var newPath = "./public/arquivo/" + nome;
      fs.rename(oldPath, newPath, function (err) {
        if (err) throw err;
      });
    }
    resolve(nome);
  });
};
