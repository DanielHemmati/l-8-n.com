interface ContainerProps {
    children: React.ReactNode;
}

function Container({ children, ...props }: ContainerProps) {
    return (
        <div className="container mx-auto mt-11" {...props}>
            {children}
        </div>
    );
}

export default Container;
