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

export function Confirmation({
  programName,
  programValue,
}: {
  programName: string;
  programValue: string;
}) {
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
        <Container
          style={{
            ...top,
            border: "1px solid #E7E7E7",
          }}
        >
          <Img
            style={{
              width: "120px",
              margin: "0 auto",
              marginTop: "34px",
            }}
            src="https://utfs.io/f/1qPF1XpefKWuDJEBuuvXLutEz27S5wKBbY3C9RjrhFkJgMTi"
          />
          <Heading
            as="h1"
            style={{
              ...h1,
              fontWeight: 900,
              color: colors.primary,
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

          <Heading
            as="h2"
            style={{
              ...h1,
              fontWeight: 900,
              color: colors.primary,
              fontSize: "30px",
            }}
          >
            GRACIAS POR
          </Heading>
          <Heading
            as="h3"
            style={{
              textAlign: "center" as const,
              color: colors.primary,
              fontSize: "28px",
              marginTop: "0",
            }}
          >
            TU COMPRA
          </Heading>

          <Text
            style={{
              textAlign: "center" as const,
              color: colors.primary,
              fontSize: "14px",
              fontWeight: 400,
              marginTop: "0",
            }}
          >
            Ingresa a nuestra plataforma:
          </Text>

          <Link
            href="https://globtm.vercel.app/academy"
            style={{
              marginLeft: "95px",
              fontSize: "24px",
              fontWeight: 900,
              color: colors.primary,
              textDecorationLine: "underline",
            }}
          >
            Da clic aquí para ingresar
          </Link>
          <Text
            style={{
              ...text,
              textAlign: "center" as const,
              fontSize: "16px",
              margin: "10px 38px 0 38px",
            }}
          >
            Te agradecemos por confiar en nosotros para aprender inglés.{" "}
          </Text>
          <Text
            style={{
              ...text,
              textAlign: "center" as const,
              fontSize: "20px",
              marginTop: "10px",
              marginBottom: "10px",
              color: colors.primary,
            }}
          >
            Tu curso
          </Text>
          <Container
            style={{
              backgroundColor: colors.primary,
              width: "fit-content",
              borderRadius: "8px",
            }}
          >
            <Text
              style={{
                textAlign: "center" as const,
                fontSize: "18px",
                fontWeight: 900,
                margin: "20px 80px 0 80px",
                color: "white",
              }}
            >
              {programName}
            </Text>
            <Text
              style={{
                ...text,
                textAlign: "center" as const,
                fontSize: "20px",
                marginTop: "5px",
                color: "white",
              }}
            >
              COP {programValue}
            </Text>
          </Container>
          <Text
            style={{
              textAlign: "center" as const,
              color: colors.primary,
              fontSize: "14px",
              fontWeight: 400,
              marginTop: "20px",
            }}
          >
            ¡Tu apoyo significa mucho para nosotros!
          </Text>
          <Text
            style={{
              textAlign: "center" as const,
              color: colors.primary,
              fontSize: "14px",
              width: "300px",
              fontWeight: 400,
              marginTop: "0",
              marginBottom: "40px",
              marginLeft: "100px",
            }}
          >
            Estamos aquí para ayudarte en cada paso del camino hacia tu fluidez.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const colors = {
  primary: "#8A63B0",
  secondary: "#4F3569",
  background: "#9876ba",
  accentForeground: "#B197CB",
};

const top = {
  backgroundColor: "white",
  borderRadius: "8px 8px 0 0",
  maxWidth: "500px",
  fontFamily: "Poppins, Verdana, sans-serif",
  fontSize: "16px",
  fontWeight: 400,
};

const h1 = {
  textAlign: "center" as const,
  fontSize: "42px",
  fontWeight: 900,
  margin: "34px 24px 0px 24px",
  lineHeight: "1.2",
};

const text = {
  fontSize: "16px",
  fontWeight: 400,
  margin: "24px 34px",
  lineHeight: "1.5",
};

const span = {
  color: colors.secondary,
};
