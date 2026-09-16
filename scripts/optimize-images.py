from pathlib import Path
from PIL import Image, ImageOps
import json, re
root=Path('src/images'); manifest={}; before=0; after=0
for path in list(root.rglob('*')):
 if path.suffix.lower() not in ['.jpg','.jpeg','.png'] or 'optimized' in path.parts: continue
 rel=path.relative_to(root); target=root/'optimized'/rel.with_suffix('.webp'); target.parent.mkdir(parents=True,exist_ok=True)
 is_logo=path.name=='islandmadatravel.png'
 with Image.open(path) as source:
  im=ImageOps.exif_transpose(source).convert('RGB' if path.suffix.lower()!='.png' else 'RGBA')
  im.thumbnail((160,160) if is_logo else (2400,1800), Image.Resampling.LANCZOS)
  im.save(target,'WEBP',quality=83,method=6)
  before+=path.stat().st_size; after+=target.stat().st_size
  if not is_logo:
   small=im.copy(); small.thumbnail((768,768),Image.Resampling.LANCZOS); mobile=target.with_stem(target.stem+'-768');small.save(mobile,'WEBP',quality=80,method=6)
   manifest[str(target).replace('\\','/')]= {'width':im.width,'height':im.height,'smallWidth':small.width,'mobile':str(mobile).replace('\\','/')}
for path in list(Path('src').rglob('*.jsx'))+list(Path('src/data').glob('*.js')):
 s=path.read_text(encoding='utf-8-sig')
 s=re.sub(r"(from ['\"]\.\./images/)(?!optimized/)(.*?)(\.(?:jpg|png|jpeg))(['\"])",r'\1optimized/\2.webp\4',s)
 if s != path.read_text(encoding='utf-8-sig'): path.write_text(s,encoding='utf-8')
p=Path('index.html');s=p.read_text(encoding='utf-8');s=s.replace('/src/images/islandmadatravel.png','/src/images/optimized/islandmadatravel.webp').replace('type="image/png"','type="image/webp"');p.write_text(s,encoding='utf-8')
Path('src/data/imageManifest.json').write_text(json.dumps(manifest,ensure_ascii=False),encoding='utf-8')
print(json.dumps({'original_bytes':before,'optimized_bytes':after,'reduction_percent':round((1-after/before)*100,1),'images':len(manifest)},indent=2))
