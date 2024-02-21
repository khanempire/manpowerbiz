/* eslint-disable react/prop-types */
import {Modal, Text, Title} from '@mantine/core';
const phoneNumber = "8420161635"
const TermsAndConditions = ({opened,setOpened}) => {
  return (
    <Modal
    size="auto"
    opened={opened}
    closeOnClickOutside={false}
    closeOnEscape={false}
    onClose={() => {
        setOpened(!opened);
    }}
>
    <Title order={3} align="center">
        Terms and Conditions
    </Title>
    <Title order={4} align='left'>
        1. Acceptance of Terms:
    </Title>
    <Text ml='1rem'>
        By accessing or using our platform, you agree to comply with and be bound by these terms and conditions. If you do not agree with any part of these terms, please do not use our services.
    </Text>
    <Title order={4} align='left'>
        2. Services Offered::
    </Title>
    <Text ml='1rem'>
        Our platform connects users with skilled professionals such as plumbers, painters, AC service and repair technicians, electricians, carpenters, packers and movers, and interior designers.
    </Text>
    <Title order={4} align='left'>
        3. Service Requests:
    </Title>
    <Text ml='1rem'>
        Users may submit service requests through our platform, providing details about the required service. We will make reasonable efforts to connect users with suitable professionals.
    </Text>
    <Title order={4} align='left'>
        4. Professional Service Providers::
    </Title>
    <Text ml='1rem'>
        Professionals on our platform are independent contractors. We do not guarantee the quality of their services, and users are encouraged to verify credentials and reviews before hiring.
    </Text>
    <Title order={4} align='left'>
        5. Service Charges:
    </Title>
    <Text ml='1rem'>
        Users will be informed about the service charges before confirming a booking. Payment must be made through our platform. We reserve the right to modify service charges, and any changes will be communicated in advance.
    </Text>
    <Title order={4} align='left'>
        6. Cancellation and Rescheduling:
    </Title>
    <Text ml='1rem'>
        Users may cancel or reschedule a booked service within a specified time frame. Cancellation fees may apply, and details can be found in the cancellation policy.
    </Text>
    <Title order={4} align='left'>
        7. User Responsibilities::
    </Title>
    <Text ml='1rem'>
        Users are responsible for providing accurate information about their service requirements. Any additional services requested on-site may result in extra charges.
    </Text>
    <Title order={4} align='left'>
        8. Liability:
    </Title>
    <Text ml='1rem'>
        We are not liable for any damages or losses resulting from the use of our platform or services. Users are advised to take appropriate precautions and insurance coverage.
    </Text>
    <Title order={4} align='left'>
        9. Feedback and Reviews:
    </Title>
    <Text ml='1rem'>
        Users are encouraged to provide feedback and reviews after receiving services. We reserve the right to moderate and remove inappropriate content.
    </Text>
    <Title order={4} align='left'>
        10. Privacy and Security:
    </Title>
    <Text ml='1rem'>
        We prioritize user privacy and employ security measures to protect personal information. Our privacy policy outlines the details of data collection, storage, and usage.
    </Text>
    <Title order={4} align='left'>
        11. Intellectual Property:
    </Title>
    <Text ml='1rem'>
        All content on our platform, including logos, text, and images, is our intellectual property. Users may not use, reproduce, or distribute this content without our explicit permission.
    </Text>
    <Title order={4} align='left'>
        12. Termination of Services:
    </Title>
    <Text ml='1rem'>
        We reserve the right to terminate or suspend services to any user violating these terms and conditions without prior notice.
    </Text>
    <Title order={4} align='left'>
        13. Governing Law:
    </Title>
    <Text ml='1rem'>
        These terms and conditions are governed by the laws of [Jurisdiction], and any disputes will be resolved in accordance with these laws.
    </Text>
    <Title order={4} align='left'>
        14. Changes to Terms:
    </Title>
    <Text ml='1rem'>
        We reserve the right to update or modify these terms and conditions at any time. Users will be notified of significant changes.
    </Text>

    {/* Privacy Policy */}

    <Title order={3} align="center" mt='2rem'>
        Privacy Policies
    </Title>
    <Title order={4} align="left">
        1. Information We Collect:
    </Title>

    <Title order={5} align="left" ml='1rem'>
        a. Personal Information:
    </Title>
    <Text ml='2rem'>
        We may collect personal information such as your name, contact details, address, and payment information when you register on our platform or use our services.
    </Text>
    <Title order={5} align="left" ml='1rem'>
        b. Service-Related Information:
    </Title>
    <Text ml='2rem'>
        Information about the services you request, your home details, and specific requirements are collected to facilitate service provision.
    </Text>

    <Title order={5} align="left" ml='1rem'>
        c. Usage Information:
    </Title>
    <Text ml='2rem'>
        We may collect data on how you interact with our platform, including pages visited, time spent, and actions taken, to improve our services.
    </Text>


    <Title order={4} align="left">
        2. How We Use Your Information:
    </Title>

    <Title order={5} align="left" ml='1rem'>
        a. Service Provision:
    </Title>
    <Text ml='2rem'>
        We use collected information to connect users with suitable professionals and facilitate the requested services.
    </Text>
    <Title order={5} align="left" ml='1rem'>
        b. Communication:
    </Title>
    <Text ml='2rem'>
        Your contact information may be used to communicate with you regarding service updates, appointment confirmations, and other relevant notifications.
    </Text>

    <Title order={5} align="left" ml='1rem'>
        c. Improvement of Services:
    </Title>
    <Text ml='2rem'>
        We analyze collected data to enhance the quality of our platform, services, and user experience.
    </Text>


    <Title order={4} align="left">
        3. Information Sharing:
    </Title>

    <Title order={5} align="left" ml='1rem'>
        a. Service Providers:
    </Title>
    <Text ml='2rem'>
        Your information may be shared with professionals on our platform to facilitate service provision.
    </Text>
    <Title order={5} align="left" ml='1rem'>
        b. Legal Compliance:
    </Title>
    <Text ml='2rem'>
        We may disclose personal information if required by law or in response to legal requests.
    </Text>

    <Title order={4} align="left">
        4. Security Measures:
    </Title>
    <Text ml='1rem'>
        We implement security measures to protect your personal information against unauthorized access, disclosure, or alteration. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
    </Text>

    <Title order={4} align="left">
        5. Cookies and Tracking:
    </Title>
    <Text ml='1rem'>
        We use cookies and similar technologies to enhance user experience, analyze trends, and administer the platform. You can manage cookie preferences through your browser settings.
    </Text>

    <Title order={4} align="left">
        6. Third-Party Links:
    </Title>
    <Text ml='1rem'>
        Our platform may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites.
    </Text>

    <Title order={4} align="left">
        7.  Updates to Privacy Policy:
    </Title>
    <Text ml='1rem'>
        We reserve the right to update this privacy policy to reflect changes in our practices. Users will be notified of significant changes.
    </Text>

    <Title order={4} align="left">
        8.  Contact Information:
    </Title>
    <Text ml='1rem'>
        If you have any questions or concerns regarding our privacy practices, please contact us at <a href={`https://wa.me/${phoneNumber}`} target='_blank' rel="noreferrer">Link</a>.
    </Text>

    {/* Cancellation Policy */}

    <Title order={3} align="center" mt='2rem'>
        Cancellation Policies
    </Title>
    <Title order={4} align="left">
        1. User-initiated Cancellations:
    </Title>
    <Text ml='1rem'>
        Users may cancel a booked service by contacting our customer support or can go to dashboard and cancel the order within 24 hours of placing the order. No cancellation fees will be charged if the cancellation is made within this timeframe.
        Cancellations made after 24 hours of placing the order may be subject to a cancellation fee. The fee will be communicated to the user at the time of cancellation.
    </Text>

    <Title order={4} align="left">
        2. Service Provider Cancellations:
    </Title>
    <Text ml='1rem'>
        In the rare event of a service provider being unable to fulfill a confirmed booking, we will make reasonable efforts to find a replacement. If a replacement cannot be found, the user will be eligible for a full refund.
    </Text>


    {/* Refund Policy */}

    <Title order={3} align="center" mt='2rem'>
        Refund Policies
    </Title>
    <Title order={4} align="left">
        1. Refund Processing Time:
    </Title>
    <Text ml='1rem'>
        Refunds will be processed within 5 to 7 working days from the date of the cancellation request. Please note that the actual receipt of funds may vary depending on your financial institution.
    </Text>

    <Title order={4} align="left">
        2. Refund Method:
    </Title>
    <Text ml='1rem'>
        Refunds will be issued to the original payment method used during the booking process.
    </Text>

    <Title order={4} align="left">
        3. No-show Policy:
    </Title>
    <Text ml='1rem'>
        If a user is not present at the scheduled service time without prior notice, the service will be considered a no-show. No-shows are not eligible for a refund, and a cancellation fee may apply.
    </Text>

    <Title order={4} align="left">
        4. Modification of Bookings:
    </Title>
    <Text ml='1rem'>
        Users may request modifications to their bookings, such as rescheduling or changing service details, by contacting our customer support or they can direct do from dashboard. Modifications are subject to availability and may be subject to additional charges.
    </Text>

    <Title order={4} align="left">
        5. Contact Information:
    </Title>
    <Text ml='1rem'>
        For any questions or concerns regarding cancellations and refunds, please contact our customer support at  <a href={`https://wa.me/${phoneNumber}`} target='_blank' rel="noreferrer">Link</a>.
    </Text>

    <Title order={4} align="left">
        6. Policy Updates:
    </Title>
    <Text ml='1rem'>
        We reserve the right to update this Refund and Cancellation Policy. Users will be notified of any significant changes.
    </Text>

    <Text mt='2rem'>
        By using our platform, you acknowledge that you have read, understood, and agree to these terms and conditions. If you have any questions, please contact us at <a href={`https://wa.me/${phoneNumber}`} target='_blank' rel="noreferrer">Link</a>.
    </Text>

    {/* contact us policies */}

    <Title order={3} align="center" mt='2rem'>
        Contact Us Policies
    </Title>

    <Text ml='1rem'>
       Thank you for reaching out to us. We value your feedback and inquiries. Please find our contact information below:
    </Text>

    <Title order={4} align="left">
        1. Contact Number:
    </Title>
    <Text ml='1rem'>
    Feel free to give us a call at 8420161635 or click this <a href={`https://wa.me/${phoneNumber}`} target='_blank' rel="noreferrer"> WhatsApp Link</a>. Our customer service representatives are available from 8 A.M to 8 P.M everyday to assist you.
    </Text>

    <Title order={4} align="left">
        2. Email Address::
    </Title>
    <Text ml='1rem'>
    For any inquiries or assistance via email, you can reach us at mpb.kol@manpowerbiz.in. We aim to respond to emails within 2 days.
    </Text>

    <Title order={4} align="left">
        3. Business Operating Address:
    </Title>
    <Text ml='1rem'>
    www.manpowerbiz.in
    PLOT - BE - 65, Action Area, Newtown,
    Kolkata, West-Bengal, 700156
    India
    </Text>

</Modal >
  )
}

export default TermsAndConditions