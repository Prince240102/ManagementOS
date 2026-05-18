import clsx from 'clsx'

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}) {
  const base = 'btn'
  const variantCls = {
    primary: 'btn-p',
    secondary: 'btn-s',
    danger: 'btn-d',
    success: 'btn-g',
  }[variant]
  const sizeCls = size === 'sm' ? 'btn-sm' : size === 'xs' ? 'btn-xs' : ''
  return (
    <button className={clsx(base, variantCls, sizeCls, className)} {...rest}>
      {children}
    </button>
  )
}
