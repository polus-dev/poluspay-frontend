import classNames from "classnames"

import './ProgressBar.scoped.scss'

interface ProgressBarItem {
    id: number
    title: string
}

interface ProgressBarProps {
    current: number
    options: ProgressBarItem[]
}

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
    const firstId = props.options[0].id
    const lastOption = props.options.slice(-1)

    return (
        <div className="progress-bar">
            {props.options.map((el) => (
                <div
                    className="progress-bar__item"
                    style={{
                        width: el.id !== lastOption[0].id
                            ? `calc(100% / ${props.options.length - 1})`
                            : '24px'
                    }}
                    key={el.id}
                >
                    <div
                        className={classNames({
                            'progress-bar__item-pointer': true,
                            'progress-bar__item-pointer--active': props.current >= el.id,
                        })}
                    >
                        <div className="progress-bar__item-label">
                            <p className="progress-bar__item-label__inner">
                                {el.title}
                            </p>
                        </div>
                        <div
                            className={classNames({
                                'progress-bar__item-pointer__inner': true,
                                'progress-bar__item-pointer__inner--active': el.id === firstId || props.current > el.id
                            })}
                        />
                    </div>
                    {el.id !== lastOption[0].id && (
                        <div
                            className={classNames({
                                'progress-bar__item-line': true,
                                'progress-bar__item-line--active': props.current > el.id
                            })}
                        />
                    )}
                </div>
            ))}
        </div>
    )
}

export default ProgressBar
