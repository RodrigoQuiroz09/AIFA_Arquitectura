# Felipe Ángeles International Airport (AIFA) Gate and Position Scheduler

## RODRIGO QUIROZ REYES & ESTEBAN MANRIQUE DE LARA SIRVENT

![](Aspose.Words.0f5a274b-ecc2-4f38-8f92-6d09f1a008dd.001.png)

**Architecture Project Description and Scope**

**_Project Background_**

Felipe Ángeles International Airport is the result of a combination of factors including the saturation presented by Mexico City and Toluca International airport, Texcoco’s International airport cancellation at the start of Andrés Manuel López Obrador government and other political, economical and logistical issues.

A need for a certain solution for the aforementioned elements have resulted in the design and construction, under 4 years, of an international airport, consisting of one terminal building, three landing tracks, 14 contact positions attached to the terminal building and 11 remote positions.

AIFA will work, in a simultaneous way, with Mexico City and Toluca airports, drifting in the need for stretch cooperation and close coordination with the three airports. Therefore, the necessity of having adequate scheduling, disembarkation and passenger handling in general, is of the greatest importance. Particularly for this reason, a technological solution, with its foundations being in a solid architecture and profound design, has been asked to be developed and implemented to improve the current occupancy management and scheduling in Mexican airports, specially those located in the central region of this country.

**_Summary of Request_**

The project has three particular main goals, which were laid out during its kick off meeting/discussion. Firstly, the solution should generate an inventory of the in-place and remote positions at any time. Additionally, each position is to have an occupancy schedule with regular updates with its status. Finally, airline representatives need to have the ability to configure self-service reservations, which require the approval from an airport’s administrator to be fully scheduled and ready to be used.

**_Scope_**

The scope of this particular project is the creation of a POF (Proof of Concept) of an architecture implicated with the logistical and air control section of the AIFA. The proposed solution will contemplate system design, engineering, development and be put in production as soon as all the requirements are met and a functional version of the project is ready. All of the previously mentioned steps are to be completed and presented to the client on May 25th, 2022.

Business, data, application and technology domains will be covered and fully deployed by this solution. This turns out to be an all-inclusive architecture.

**Overview of Architecture Vision**

**_Problem and Change Drivers_**

Nowadays, AIFA is missing a reliable solution capable of keeping an inventory and control over the different positions and reservations done over them. Having said this, the airport’s authorities are in need of changing this irregulated state of administration to a more supervised state of management. As a result of this, the solution, to be discussed, in detail, in this report, will be created.

**_Business Objectives_**

- The solution will guarantee a 50% reduction of the time needed to reserve a position (by airline representatives) in the AIFA, in a period no longer than six months.
- A stricter control of the in place and remote positions will be generated. Therefore, in a six month period of time, a report of said positions will be updated every 10 minutes.
- Administrative personnel will invest up to 35% less time in management and logistics activities associated with occupancy scheduling. This is expected to happen in less than eight months.
- Incidents regarding “double registrations” in the same positions or any other incidents related to mismanagement of the positions at AIFA, are expected to reach a 95% decrease in no more than 15 months.

**_Business Requirements_**

**Functional Requirements**

- Sign-up interface for both, airline representatives and airport administrators.
- Home page, where airline staff can visualize the current status of different positions and decide at what moment and time they want to perform a reservation.
- Reservation interface, where airline representatives can schedule the said administrative processes (date and position).
- Confirmation email is to be sent to the airline individual who performed the reservation.
- Historical register of reservations done by any airline representative. The register will be done by account, not by airline.
- Administrative interface, where airport staff can confirm or deny any “To be confirmed” reservation done by an airline representative.
- Administrative interface, where an occupancy schedule for each position can be assessed and reviewed.
- Capability of blocking positions (in a range of days or weeks), due to maintenance or any other logistical reasons.
- Reservations should be only done two weeks in advance, at maximum.
- A maximum of consecutive reservations should be established. The number is still TBC.
- Reservations should have the “To be confirmed” status until any AIFA administrator sets it to “Confirmed”.

**Non-Functional and Data Requirements**

- All airline representatives should have access to the system.
- Application should be accessible from any device. (Portability)
- The Solution should be easy to maintain. Maintenance periods are still TBD.
- The system should be available over the Internet.
- The solution should have near real time status.
- Transactions should be under 500 milliseconds.
- The proposed solution should be scalable.
- RTO should be less than 10 minutes.
- RPO should be less than 2 seconds.

**_Solution Concept Diagram_**

**Business Architecture View**

![](Aspose.Words.0f5a274b-ecc2-4f38-8f92-6d09f1a008dd.002.png)

1. Login portal to the solution.
   1. Airline representative portal
   1. AIFA administration portal
1. AIFA positions inventory and status visualizer. Both types of users can access the portal for reservation-related activities.
1. Airline reservation portal, where reservations are set into TBC status.
1. Email is sent after reservation is accepted or denied by AIFA administrator.
1. Historical data (previous reservations) can be seen by airline representatives.
1. AIFA administrative panel
   1. Reservations can be Accepted.
   1. Reservations can be Denied.
   1. Positions can be blocked

\* Application should be accessible from any device (Portability).
\- Only Airline representatives and AIFA administrators should have access.

**Application/Data Architecture View**

![](Aspose.Words.0f5a274b-ecc2-4f38-8f92-6d09f1a008dd.003.png)

\- The solution should be easy to maintain; Maintenance periods are TBD. React components are to be used for this precise reason

**Technology Architecture View**

![](Aspose.Words.0f5a274b-ecc2-4f38-8f92-6d09f1a008dd.004.png)

- **AWS WAF** (Web Application Firewall): Layer 3 and 4 protection (DNS, SMTP, Telnet, RDP, SSH y FTP). HTTP and HTTPS traffic will be filtered. Cloud-based.
- **3 Elastic Load Balancers**: **Load Balancer 1** is an **Application Load Balancer**, while **Load Balancers 2** and **3** will be **Classic Load Balancers** for **Databases.**
- **At least** (**not limited**) **4 AWS c6gn.2xlarge instances** (8 virtual CPU, 16GB, EBS storage, up to 25 Gbps, AWS Graviton2, HTTP/HTTPS/SSH/FTPS ports activated).
- **At least** (**not limited**) **5 AWS im4gn.large instances** (2 virtual CPU, 8 GB, 1 x 937, SSD NVMe storage, up to 50 Gbps, AWS Graviton2, 1137, 27017 and 27018 ports (MongoDB) activated).

**- System** should be **available** over the **Internet**. Therefore, the **use** of **100%** **AWS infrastructure**.
**-** **Solution** should have **near real time status**; **reliable infrastructure** for **constant** data **updates**.
**-** **Transactions** should be **under 500 ms**, **RTO** below **10 minutes** and **RPO** under **2 seconds**. Because of these, **multiple layers** of **redundancy** are being implemented.
**-** **Solution** should be **scalable**. This infrastructure has p**erfect scalability capabilities**, due to using **cloud technologies**.

**Infrastructure’s Cost**

|           AWS WAF            |                              |              |
| :--------------------------: | :--------------------------: | ------------ |
|                              |        **_CONCEPT_**         | **_USD_**    |
|                              |           Web ACL            | $ 5.00       |
|                              |           3 rules            | $ 3.00       |
|                              |      Requests 1 M/month      | $ 0.60       |
|                              |    AWS WAF Fraud Control     | $ 10.00      |
|                              | 3000 login analyzed attempts | $ 3.00       |
|                              |          **TOTAL**           | **$ 21.60**  |
|  Application Load Balancer   |                              |
|                              |          **TOTAL**           | **$ 21.96**  |
|                              |                              |
|   2 Classic Load Balancers   |                              |
|                              |          **TOTAL**           | **$ 43.92**  |
|                              |                              |
| 4 AWS c6gn.2xlarge instances |                              |
|                              |          **TOTAL**           | **$ 607.20** |
|                              |                              |
| 5 AWS im4gn.large instances  |                              |
|                              |          **TOTAL**           | **$ 432.00** |
|            Others            |                              |
|                              |           Email JS           | $ 40.00      |
|                              |           Mongodb            | $ 57.00      |
|                              |          **TOTAL**           | **$ 97.00**  |
|       **GRAND TOTAL**        |          $ 1,223.68          |

**_Stakeholders and Concerns_**

| **Stakeholder Group Name** |                                                                   **Responsibilities within AIFA**                                                                   |                                                                                                           **Concerns**                                                                                                            |
| :------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|  Airline Representatives   |                                                       - Perform reservations for the companies they represent                                                        |                             Be able, at any moment, to represent and seek for the interests of the airline they represent. No special concerns regarding the solution, except its high disponibility.                             |
|    AIFA Administrators     | <p>- Confirm reservations done by the airline representatives.</p><p>- Block positions when needed.</p><p>- Keep record of occupancy schedules for each position</p> | High disponibility is of great relevance. Low RTO and RPO due to the critical importance of this system. Updating periods (inventories) are also an important concern. All of the aforementioned due to their job at the airport. |
|      AIFA Authorities      |                                                         - Make sure AIFA is working at its peak performance.                                                         |                        No concerns regarding the solution. However, as this group is the “public face” of AIFA, it is of their interest that the system keeps working in an uninterrupted and optimal way.                        |
|       AIFA Visitors        |                                                                                 None                                                                                 |                                The system will increase or reduce the amount of time, of the members of this group, inside the airport. The better the system is, the shorter their stay will be.                                 |

**_Project Constraints_**

- Authentication should be using the current security system.
- Due to the nature of the information to be stored, a document-oriented database is to be used; Mongo has been selected for said reasons.
- Due to RTO, RPO and other non-functional requirements, cloud technologies are to be implemented with this architecture.
- Javascript and React are the frameworks selected for the creation of this solution. The aforementioned is due to the fact it is a web application project.

**Specific Change of Scope Procedures**

**Procedures to Solicit Scope Changes**

A request letter, informing the development team of the changes being aked is to be delivered in working hours (Monday-Friday, from 8:00 - 17:00). This document should require, as minimum, the following elements:

- Petitioner's name
- Date the request is being made
- A detailed description (texts on what elements, presented in the requirements elicitation are to be modified, reasons on why they should be changed and aims on how the reformed/new components should look like) of the change(s) that are being asked.
- 3 possible one hour periods in the following 5 working days in which a meeting can take place in order to discuss these modifications.

After the request letter is sent, the development team will evaluate the viability of the changes being asked by the client. In the five working days after the letter’s delivery, a meeting will take place and either the changes will be accepted (with discussion regarding implementation, time allocation and additional fees) or rejected. The following section, “Out of Scope”, includes certain guidelines of what scope changes are not to be asked by the client. Failure to comply with said instructions will automatically reject the change request.

**Out of Scope**

- Installation and maintenance of any hardware at the AIFA installations needed for this solution to work in a proper way.
- Code modifications that had not been stipulated in the requirements elicitation found in this document; if they require less than 10 hours to be deployed and adequately tested, extra fees will be covered and they will be delivered to the client as soon as they are ready and functional.
- Any action that implies a change in external systems and/or databases to be used by the solution been developed
- Any changes to System and/or technological requirements.

**Roles, Responsibilities and Deliverables**

**Roles**

- Project manager: Esteban Manrique de Lara
- UX / UI designers: Rodrigo Quiroz Reyes
- Business analyst: Esteban Manrique de Lara
- Software developers: Rodrigo Quiroz Reyes and Esteban Manrique de Lara
- Team lead / Tech lead: Rodrigo Quiroz Reyes

**Responsibilities**

On one hand, Rodrigo Quiroz Reyes will be in charge of most of the development and coding side of this solution; creating the actual website using JavaScript and the React framework and performing the database connections will be his primary responsibilities. On the other hand, Etseban Manrique de Lara will be responsible for the analysis and management of the project, as well as in charge of any documentation of deliverables not directly related to the aforementioned tasks. Both members of this team are to work together on the design, at all levels, of the architecture; interface, deployment and testing designs should be conducted by both individuals.

**Deliverables**

- Functional system, according to the elicited requirements in this document.
- Documentation explaining technical details, such as architectural features, interface design and AWS services credentials. In other words, the “Statement of Architecture Work”.
- Executive Presentation displaying final results for the completed system.
- User’s manual, for every user archetype defined in this document.

**Acceptance Criteria and Procedures**

**Acceptance Criteria**

- The solution should be delivered within the resource limits (time and budget) established with the client.
- Achieve all customer specifications (requirements found in this document). This includes functional, non-functional and data requirements, as well as business objectives.
- Solution should be widely tested (unit, integration and stress testing among the ones to be applied).
- KPIs to be used to measure effectiveness of the solution:
  - Nowadays average time needed to perform a reservation VS mean time needed when the solution is optimal. The average time for both instances will be taken from 500 reservations done by airplane representatives.
  - Percentage of logistic and position mismanagement instances before the solution VS the same metric but after the project's termination. 500 position-handlings will be taken into consideration.
  - Simulation regarding a catastrophic event around/in the airport. The aforementioned to measure if RTO and RPO comply with the client’s specifications.

**Procedures**

The following guidelines and directives will go underway when performing any delivery or action that requires the acceptance of the client:

- The official communication channels between the development team and the client will be Slack (development updates, inquiries and suggestions are to be mainly poured in this media) and emails -administrative and meeting handling are to be performed here-.
- A biweekly meeting is to be held between the development team and the client. In it, progress done by the development party will be shown to the client. Therefore, the client will be able to provide feedback and recommendations that fall under the conditions established in the “Specific Change of Scope Procedures” section.
- Development of this project will undergo strict scrutiny.
- Partial deliveries (dates to be mentioned in the “Schedule” section of this document) will require special meetings between both involved parties. As their name suggests, these will serve as milestones to evaluate the advancements the project has undergone.

**Architecture Project Plan and Schedule**

\*Preguntarle a Legardo si son las mismas fases del Timeline que lo visto en la materia previa?

\*Se requiere Gantt Chart con Function points, Costos, etc.?

**Approvals**

At any delivery moment, the client will have two working days to review the partial or total delivery being made by the development team. If observations are to be made, the client will follow the steps and guidelines found at the “Procedures to Solicit Scope Changes” of this document. Otherwise, the client is to sign an “Approval Document”, which will have the following structure (not limited or restricted by this example):

_Mexico City, DATE_

_I, CLIENT REPRESENTATIVE NAME, in representation of the client’s party in this project, accept and approve the following progress and completed steps of this project:_

- _In here, a list_
- _of modules/interfaces/deliverables_
- _being delivered and accepted by the client_
- _will be listed_

_After the acceptance of said steps, no changes, unless they suppose an existential threat or flaw to the correct functioning of this project, will be applied to the modules/functions/requirements fulfilled present in this Approval Document._

\------------------------------------------ -----------------------------------------
_Client’s representative Signature Development team project manager Signature_

**Architecture Principles**

**Reuse Components at All Times:**
Statement: Components such as buttons, input text and typography/color scheme is needed to be able to reuse for future projects and inside the system.
Rationale: Having a consistency in the overall of the application gives accountability when handling credentials.
Implications: Being able to create generic elements with capacity to mutate to the functionalities needed.

**Precise Database Pipelines:**
Statement: Database pipelines should only return the most essential data needed for any process or task.
Rationale: Rapid response times are expected. Principle of Minimum Knowledge is to be applied with DB retrieved data.
Implications: Pipeline optimization mechanics are to be implemented; the DB being used will define said tools. Pipelines are to be updated every two months.

**Availability is King:**
Statement: SLA for this particular application is expected to be between 98% and 99% in a yearly scheme.
Rationale: Airports are critical infrastructure for any country, Therefore, this solution is to be active as much as possible.
Implications: Architecture must contemplate the use of cloud technologies. Redundancy in database, web application and other components of the architecture is expected.
