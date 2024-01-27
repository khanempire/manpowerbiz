/* eslint-disable react/prop-types */
import { createStyles, Text, Container, ActionIcon, Group, rem, Stack, Image } from "@mantine/core";
import { IconBrandFacebook, IconBrandWhatsapp, IconBrandInstagram } from "@tabler/icons-react";
import website_logo from "../../assets/website_logo.png";
const phoneNumber = "8420161635"; // Replace with the actual phone number

const data = [
  {
    title: "About",
    links: [
      {
        label: "Rate Card",
        link: "#",
      },
      // {
      //   label: "Pricing",
      //   link: "#",
      // },
      {
        label: "Support",
        link: `https://wa.me/${phoneNumber}`,
      },
      // {
      //   label: "Forums",
      //   link: "#",
      // },
    ],
  },
  // {
  //   title: "",
  //   links: [],
  // },
  // {
  //   title: "",
  //   links: [],
  // },

  // {
  //   title: "Project",
  //   links: [
  //     {
  //       label: "Contribute",
  //       link: "#",
  //     },
  //     {
  //       label: "Media assets",
  //       link: "#",
  //     },
  //     {
  //       label: "Changelog",
  //       link: "#",
  //     },
  //     {
  //       label: "Releases",
  //       link: "#",
  //     },
  //   ],
  // },
  // {
  //   title: "Community",
  //   links: [
  //     {
  //       label: "Join Discord",
  //       link: "#",
  //     },
  //     {
  //       label: "Follow on Twitter",
  //       link: "#",
  //     },
  //     {
  //       label: "Email newsletter",
  //       link: "#",
  //     },
  //     {
  //       label: "GitHub discussions",
  //       link: "#",
  //     },
  //   ],
  // },
];

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(120),
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    backgroundColor: theme.colors.dark[6],
    borderTop: `${rem(1)} solid ${theme.colors.gray[2]}`,
  },

  logo: {
    maxWidth: rem(200),

    [theme.fn.smallerThan("sm")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },

  description: {
    marginTop: rem(5),

    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
      textAlign: "center",
    },
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  inner2: {
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },

  groups: {
    display: "flex",
    flexWrap: "wrap",

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  wrapper: {
    width: rem(160),
  },

  link: {
    display: "block",
    color: theme.white,
    fontSize: theme.fontSizes.sm,
    paddingTop: rem(3),
    paddingBottom: rem(3),

    "&:hover": {
      textDecoration: "underline",
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: `calc(${theme.spacing.xs} / 2)`,
    color: theme.white,
  },

  afterFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  social: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
    },
  },
}));

export function MainFooterComponent() {
  const { classes } = useStyles();

  const groups = data?.map((group) => {
    const links = group.links.map((link, index) => (
      <Text key={index} className={classes.link} component="a" href={link.link} target="_blank">
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <Stack align="self-start" className={classes.inner2}>
          <Image src={website_logo} width={75}></Image>
          <div className={classes.logo}>
            <Text size="xs" color="dimmed" className={classes.description}>
              Build fully functional accessible web applications faster than ever
            </Text>
          </div>
          <Group spacing={0} className={classes.social} position="right" noWrap>
            <a href="https://www.instagram.com/manpowerbiz.in?igshid=OGQ5ZDc2ODk2ZA==" target="_blank" rel="noopener noreferrer">
              <ActionIcon size="lg">
                <IconBrandInstagram size="1.05rem" stroke={1.5} />
              </ActionIcon>
            </a>
            <a href="https://whatsapp.com/channel/0029VaBVgHw7tkj6QCIZUs2A" target="_blank" rel="noopener noreferrer">
              <ActionIcon size="lg">
                <IconBrandWhatsapp size="1.05rem" stroke={1.5} />
              </ActionIcon>
            </a>
            <a href="https://www.facebook.com/manpowerbiz?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">
              <ActionIcon size="lg">
                <IconBrandFacebook size="1.05rem" stroke={1.5} />
              </ActionIcon>
            </a>
          </Group>
        </Stack>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text color="dimmed" size="sm">
          © 2023 ManpowerBiz All rights reserved.
        </Text>
      </Container>
    </footer>
  );
}
