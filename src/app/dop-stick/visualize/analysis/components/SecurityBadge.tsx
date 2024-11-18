import { Badge } from '@/components/ui/badge'

interface SecurityBadgeProps {
  score: number
}

export function SecurityBadge({ score }: SecurityBadgeProps) {
  let color = 'emerald'
  let text = 'Excellent'

  if (score < 60) {
    color = 'red'
    text = 'At Risk'
  } else if (score < 80) {
    color = 'amber'
    text = 'Fair'
  }

  return (
    <Badge
      className={`
        h-7 px-3 
        ${
          color === 'emerald'
            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
            : ''
        }
        ${
          color === 'amber'
            ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'
            : ''
        }
        ${
          color === 'red'
            ? 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'
            : ''
        }
      `}
    >
      {text}
    </Badge>
  )
}
