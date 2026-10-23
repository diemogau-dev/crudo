"""Amplía un render con Real-ESRGAN (CPU) por mosaicos y lo mezcla con un
Lanczos del original para conservar textura. Uso: ampliar.py origen destino modelo.pth [mezcla=0.8]
Modelo: RealESRGAN_x2.pth de huggingface.co/ai-forever/Real-ESRGAN."""
import sys, torch, numpy as np
from PIL import Image
from spandrel import ModelLoader
src, dst, model_path = sys.argv[1], sys.argv[2], sys.argv[3]
blend = float(sys.argv[4]) if len(sys.argv) > 4 else 0.8
torch.set_num_threads(4)
m = ModelLoader().load_from_file(model_path).eval()
s = m.scale
im = Image.open(src).convert("RGB")
x = torch.from_numpy(np.asarray(im, np.float32) / 255).permute(2, 0, 1)[None]
_, _, H, W = x.shape
T, P = 256, 16
out = torch.zeros(1, 3, H * s, W * s)
with torch.no_grad():
    for y0 in range(0, H, T):
        for x0 in range(0, W, T):
            ya, xa = max(y0 - P, 0), max(x0 - P, 0)
            yb, xb = min(y0 + T + P, H), min(x0 + T + P, W)
            o = m(x[:, :, ya:yb, xa:xb])
            ty, tx = (y0 - ya) * s, (x0 - xa) * s
            h, w = (min(y0 + T, H) - y0) * s, (min(x0 + T, W) - x0) * s
            out[:, :, y0 * s:y0 * s + h, x0 * s:x0 * s + w] = o[:, :, ty:ty + h, tx:tx + w]
ai = (out[0].clamp(0, 1).permute(1, 2, 0).numpy() * 255).astype(np.float32)
lz = np.asarray(im.resize((W * s, H * s), Image.LANCZOS), np.float32)
res = np.clip(ai * blend + lz * (1 - blend), 0, 255).astype(np.uint8)
Image.fromarray(res).save(dst, quality=95)
print(dst, res.shape)
