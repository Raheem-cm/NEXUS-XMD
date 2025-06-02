/**
 * RAHEEM-CMD WhatsApp Bot – Sticker to Image Converter
 * Author: +255763111390
 * GitHub: https://github.com/Raheem-cm/RQHEEM-CMD
 * Description:
 * Converts WhatsApp webp stickers into PNG images using FFmpeg.
 */

const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

// Configure ffmpeg path
ffmpeg.setFfmpegPath(ffmpegPath);

class StickerConverter {
    constructor() {
        this.tempDir = path.join(__dirname, '../temp');
        this.ensureTempDir();
    }

    // Ensure temporary directory exists
    ensureTempDir() {
        if (!fs.existsSync(this.tempDir)) {
            fs.mkdirSync(this.tempDir, { recursive: true });
        }
    }

    /**
     * Convert a WhatsApp webp sticker buffer into a PNG image buffer.
     * @param {Buffer} stickerBuffer - The buffer of the webp sticker.
     * @returns {Promise<Buffer>} - The PNG image buffer.
     */
    async convertStickerToImage(stickerBuffer) {
        const timestamp = Date.now();
        const tempInput = path.join(this.tempDir, `sticker_${timestamp}.webp`);
        const tempOutput = path.join(this.tempDir, `image_${timestamp}.png`);

        try {
            // Save sticker buffer to file
            await fs.promises.writeFile(tempInput, stickerBuffer);

            // Convert using FFmpeg
            await new Promise((resolve, reject) => {
                ffmpeg(tempInput)
                    .on('error', (err) => {
                        console.error(`[RAHEEM-CMD] FFmpeg conversion failed: ${err.message}`);
                        reject(err);
                    })
                    .on('end', resolve)
                    .output(tempOutput)
                    .run();
            });

            // Return converted image buffer
            return await fs.promises.readFile(tempOutput);
        } catch (error) {
            throw new Error('[RAHEEM-CMD] Failed to convert sticker to image.');
        } finally {
            // Clean up temp files
            await Promise.all([
                fs.promises.unlink(tempInput).catch(() => {}),
                fs.promises.unlink(tempOutput).catch(() => {})
            ]);
        }
    }
}

module.exports = new StickerConverter();
