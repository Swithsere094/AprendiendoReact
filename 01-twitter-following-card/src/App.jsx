import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

export function App() {
    const FormatUsername = (userName) => `@${userName}`

    const users=[
        {
            userName: 'midudev',
            name: 'Miguel Angel Duran',
            initialIsFollowing: true
        },
        {
            userName: 'pheralb',
            name: 'Pablo Hernandez',
            initialIsFollowing: false
        },
        {
            userName: 'elonmusk',
            name: 'Elon Musk',
            initialIsFollowing: true
        },
        {
            userName: 'vxnder',
            name: 'Vanderhart',
            initialIsFollowing: true
        },
    ]

    return(
        <section className='App'>
            {
                users.map(({ userName, name, initialIsFollowing}) => (
                    <TwitterFollowCard
                        key={userName}
                        FormatUsername={FormatUsername} 
                        initialIsFollowing = {initialIsFollowing}
                        userName={userName}>{name}</TwitterFollowCard>
                ))
            }
        </section>
    )
}