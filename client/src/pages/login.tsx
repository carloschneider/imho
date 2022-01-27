import { Variants } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { LoginForm } from '../components/LoginForm';
import useAuth from '../lib/useAuth';
import { MotionContainer } from '../utils/motion';

export default function LoginPage() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) router.push('/');
    }, [user, router]);

    const variants: Variants = {
        hidden: { opacity: 0, x: -200, y: 0 },
        enter: {
            opacity: 1,
            x: 0,
            y: 0,
        },
        exit: { opacity: 0, x: 200, y: 0 },
    };

    return (
        <MotionContainer
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ type: 'spring' }}
            key={'review'}
        >
            <LoginForm />
        </MotionContainer>
    );
}

LoginPage.requireAuth = false;
