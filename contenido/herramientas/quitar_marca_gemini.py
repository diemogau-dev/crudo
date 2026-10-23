"""Quita la estrella de Gemini (overlay blanco semitransparente a ~61 x 62 px
de la esquina inferior derecha). Rellena el círculo que la contiene con un
parche de la misma imagen: busca el desplazamiento cuyo entorno mejor
coincide con el anillo alrededor de la marca y lo pega con borde suavizado."""
import cv2, numpy as np, sys

def remove(img, r_in=15, r_out=24):
    H, W = img.shape[:2]
    cx, cy = W - 61, H - 62
    yy, xx = np.mgrid[-r_out:r_out + 1, -r_out:r_out + 1]
    dist = np.hypot(xx, yy)
    ring = (dist > r_in + 1) & (dist <= r_out)
    tgt = img[cy - r_out:cy + r_out + 1, cx - r_out:cx + r_out + 1].astype(np.float32)
    best = None
    for dy in range(-90, 50, 2):
        for dx in range(-160, 50, 2):
            if np.hypot(dx, dy) < 2 * r_out + 2:
                continue
            sx, sy = cx + dx, cy + dy
            if sy - r_out < 0 or sx - r_out < 0 or sy + r_out >= H or sx + r_out >= W:
                continue
            src = img[sy - r_out:sy + r_out + 1, sx - r_out:sx + r_out + 1].astype(np.float32)
            c = float(((src - tgt) ** 2)[ring].mean())
            if best is None or c < best[0]:
                best = (c, dx, dy)
    _, dx, dy = best
    src = img[cy + dy - r_out:cy + dy + r_out + 1, cx + dx - r_out:cx + dx + r_out + 1].astype(np.float32)
    # máscara suave: 1 dentro de la marca, cae a 0 hacia el anillo
    w = np.clip((r_in + 5 - dist) / 6, 0, 1)[..., None]
    out = img.copy()
    out[cy - r_out:cy + r_out + 1, cx - r_out:cx + r_out + 1] = np.clip(src * w + tgt * (1 - w), 0, 255).astype(np.uint8)
    return out, (dx, dy)

if __name__ == "__main__":
    src, dst = sys.argv[1], sys.argv[2]
    img = cv2.imread(src)
    out, off = remove(img)
    cv2.imwrite(dst, out, [cv2.IMWRITE_JPEG_QUALITY, 95] if dst.endswith(".jpg") else [])
    print(src, "parche desde", off)
