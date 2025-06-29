export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ border: '10px solid green' }}>
        <div>TEST</div>
        {children}
      </body>
    </html>
  )
}
