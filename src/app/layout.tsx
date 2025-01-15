import PlayerComponent from "./components/player";
import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <title>FREE COPYRIGHT</title>
                <body
                    className={`w-full`}
                >
                    {children}
                    <PlayerComponent/>
                </body>
        </html>
    );
}
