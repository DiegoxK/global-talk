import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Img,
  Text,
  Font,
} from "@react-email/components";

export function Verification({ token }: { token: string }) {
  return (
    <Html lang="en">
      <Head>
        <Font
          fallbackFontFamily="Verdana"
          fontFamily="Poppins"
          webFont={{
            url: "https://fonts.gstatic.com/s/poppins/v21/pxiEyp8kv8JHgFVrJJfecg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Ingresa a tu cuenta</Preview>

      <Body>
        <Container style={top}>
          <Img
            style={{
              width: "120px",
              margin: "0 auto",
              marginTop: "34px",
            }}
            src="https://utfs.io/f/ed5cc691-65f6-438d-af70-34fef4088270-1zbfv.png"
          />
          <Heading
            as="h1"
            style={{
              ...h1,
              fontSize: "30px",
            }}
          >
            GLOBAL TALK MEDALLO
          </Heading>
          <Text
            style={{
              textAlign: "center" as const,
              fontSize: "14px",
              fontWeight: 400,
              marginTop: "0",
            }}
          >
            YOUR PERSONAL ENGLISH COACHES
          </Text>
          <Text
            style={{
              ...text,
              textAlign: "center" as const,

              fontSize: "20px",
              margin: "10px 38px 0 38px",
            }}
          >
            ¡Hola, este es tu código para entrar en la mejor academia de inglés!
          </Text>
          <Text
            style={{
              ...text,
              textAlign: "center" as const,
              fontWeight: 900,
              color: colors.secondary,
              margin: "10px 38px",
            }}
          >
            Código de verificación
          </Text>
          <Text
            style={{
              ...text,
              textAlign: "center" as const,
              fontSize: "32px",
              textTransform: "uppercase",
              margin: "10px 38px 0 38px",
            }}
          >
            <strong>{token}</strong>
          </Text>
          <Text
            style={{ ...text, textAlign: "center" as const, marginTop: "10px" }}
          >
            Usa este código para{" "}
            <span
              style={{
                color: colors.secondary,
              }}
            >
              entrar
            </span>{" "}
            en tu cuenta
          </Text>
        </Container>
        <Container style={bottom}>
          <Text style={text}>
            <strong>¿Necesitas ayuda?</strong>
          </Text>
          <Text
            style={{
              ...text,
              color: colors.accentForeground,
            }}
          >
            Si no solicitaste este código, puedes ignorar este correo
            electrónico de forma segura. Si tienes más preguntas, contacta a
            nuestro correo de soporte.
            <Link href="mailto:contacto@globtm.com">
              <span
                style={{
                  color: colors.primary,
                }}
              >
                contacto@globtm.com
              </span>
            </Link>
          </Text>
          <Text
            style={{
              ...text,
              color: colors.accentForeground,
              margin: "10px 34px 34px 34px",
            }}
          >
            Gracias!, <span>El equipo de Global Talk.</span>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const colors = {
  primary: "#916bff",
  secondary: "#4F3569",
  background: "#9876ba",
  foreground: "#fff",
  accentForeground: "#B197CB",
};

const top = {
  backgroundColor: colors.background,
  color: colors.foreground,
  borderRadius: "8px 8px 0 0",
  maxWidth: "500px",
  fontFamily: "Poppins, Verdana, sans-serif",
  fontSize: "16px",
  fontWeight: 400,
};

const bottom = {
  backgroundColor: colors.secondary,
  color: colors.foreground,
  borderRadius: "0 0 8px 8px",
  maxWidth: "500px",
  fontFamily: "Poppins, Verdana, sans-serif",
  fontSize: "16px",
  fontWeight: 400,
};

const h1 = {
  color: colors.foreground,
  textAlign: "center" as const,
  fontSize: "42px",
  fontWeight: 900,
  margin: "34px 24px 0px 24px",
  lineHeight: "1.2",
};

const text = {
  color: colors.foreground,
  fontSize: "16px",
  fontWeight: 400,
  margin: "24px 34px",
  lineHeight: "1.5",
};

const span = {
  color: colors.secondary,
};
