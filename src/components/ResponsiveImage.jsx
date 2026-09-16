import manifest from '../data/imageManifest.json'
const assets = import.meta.glob('../images/optimized/**/*.webp', { eager: true, query: '?url', import: 'default' })
const metadata = new Map(Object.entries(manifest).map(([path, data]) => [assets[path.replace('src/', '../')], { ...data, mobile: assets[data.mobile.replace('src/', '../')] }]))
export default function ResponsiveImage({ src, alt, sizes = '(max-width: 767px) 100vw, 50vw', loading = 'lazy', ...props }) {
  const data = metadata.get(src)
  return <img src={src} alt={alt} loading={loading} decoding="async" {...(data && data.smallWidth < data.width ? { width: data.width, height: data.height, srcSet: `${data.mobile} ${data.smallWidth}w, ${src} ${data.width}w`, sizes } : {})} {...props} />
}
