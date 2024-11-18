import { useCallback } from 'react'

interface CustomizedContentProps {
  root?: boolean
  depth?: number
  x?: number
  y?: number
  width?: number
  height?: number
  index?: number
  name?: string
  value?: number
  children?: React.ReactNode
  payload?: any
}

const CustomizedContent = ({
  root,
  depth,
  x,
  y,
  width,
  height,
  index,
  name,
  value,
}: CustomizedContentProps) => {
  const COLORS = ['#84cc16', '#22c55e', '#14b8a6', '#0ea5e9', '#6366f1']

  const getColor = useCallback(
    (index: number) => COLORS[index % COLORS.length],
    [],
  )

  if (!width || !height || width < 0 || height < 0) return null

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={getColor(index || 0)}
        className="transition-opacity duration-200 hover:opacity-80"
      />
      {width > 50 && height > 25 && (
        <>
          <text
            x={(x || 0) + width / 2}
            y={(y || 0) + height / 2}
            textAnchor="middle"
            fill="#fff"
            fontSize={14}
            className="font-medium"
          >
            {name}
          </text>
          <text
            x={(x || 0) + width / 2}
            y={(y || 0) + height / 2 + 20}
            textAnchor="middle"
            fill="#fff"
            fontSize={12}
          >
            {value}
          </text>
        </>
      )}
    </g>
  )
}

export default CustomizedContent
