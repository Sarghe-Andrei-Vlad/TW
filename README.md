# IEEE-Tempate
IEEE System Requirements Specification Template

# Software Requirements Specification
<!-- ## For  <project name>
Version 1.0 approved
Prepared by <author> -->
<organization>
<date created>

Table of Contents
=================
  <!-- * [Revision History](#revision-history) -->
  * [Introduction](#1-introduction)
    * 1.1 [Purpose](#11-purpose)
    <!-- * 1.2 [Document Conventions](#12-document-conventions) -->
    * 1.2 [Intended Audience and Reading Suggestions](#12-intended-audience-and-reading-suggestions)
    * 1.3 [Product Scope](#13-product-scope)
    * 1.4 [References](#14-references)
  * [Overall Description](#overall-description)
    * 2.1 [Product Perspective](#21-product-perspective)
    * 2.2 [Product Functions](#22-product-functions)
    * 2.3 [User Classes and Characteristics](#23-user-classes-and-characteristics)
    * 2.4 [Operating Environment](#24-operating-environment)
    * 2.5 [Design and Implementation Constraints](#25-design-and-implementation-constraints)
    * 2.6 [User Documentation](#26-user-documentation)
    * 2.7 [Assumptions and Dependencies](#27-assumptions-and-dependencies)
  * [External Interface Requirements](#external-interface-requirements)
    * 3.1 [User Interfaces](#31-user-interfaces)
    * 3.2 [Hardware Interfaces](#32-hardware-interfaces)
    * 3.3 [Software Interfaces](#33-software-interfaces)
    * 3.4 [Communications Interfaces](#34-communications-interfaces)
  * [System Features](#system-features)
    * 4.1 [Home Page](#41-home-page)
    * 4.2 [Login Page](#42-login-page)
    * 4.3 [Register Page](#43-register-page)
    * 4.4 [Filter Page](#44-filter-page)
    * 4.5 [Shoe Page](#45-shoe-page)
    * 4.6 [About Page](#46-about-page)
    * 4.7 [Contact Page](#47-contact-page)

  * [Other Nonfunctional Requirements](#other-nonfunctional-requirements)
    * 5.1 [Performance Requirements](#51-performance-requirements)
    * 5.2 [Safety Requirements](#52-safety-requirements)
    * 5.3 [Security Requirements](#53-security-requirements)
    * 5.4 [Software Quality Attributes](#54-software-quality-attributes)
    * 5.5 [Business Rules](#55-business-rules)
  * [Other Requirements](#other-requirements)
* [Appendix A: Glossary](#appendix-a-glossary)
* [Appendix B: Analysis Models](#appendix-b-analysis-models)
* [Appendix C: To Be Determined List](#appendix-c-to-be-determined-list)




<!-- ## Revision History
| Name | Date    | Reason For Changes  | Version   |
| ---- | ------- | ------------------- | --------- |
|      |         |                     |           |
|      |         |                     |           |
|      |         |                     |           | -->

## 1. Introduction
### 1.1 Purpose 
The purpose of this document is to present a description of the web application Footwear Smart Assistant based on the project FoSA. It will explain the purpose and features of the application, the interface of the software, what it will do and the constraints under which it must operate. This document is intended for any potential users of the software.
<!-- ### 1.2 Document Conventions
Describe any standards or typographical conventions that were followed when writing this SRS, such as fonts or highlighting that have special significance. For example, state whether priorities  for higher-level requirements are assumed to be inherited by detailed requirements, or whether every requirement statement is to have its own priority. -->
### 1.2 Intended Audience and Reading Suggestions
This document is intended for any user that might wish to use the Footwear Smart Assistant web application.
### 1.3 Product Scope
Footwear Smart Assistant has been developed with the intended purpose of being an interactive webpage for the general internet users.
### 1.4 References
[IEEE Template for System Requirements Specification Documents](https://github.com/rick4470/IEEE-SRS-Tempate/blob/master/README.md#12-document-conventions)

[Figma: The Collaborative Interface Design Tool](https://www.figma.com/)

[FoSA (Footwear Smart Assistant)](https://github.com/Sarghe-Andrei-Vlad/TW)

## Overall Description
### 2.1 Product Perspective
The Footwear Smart Assistant website is based on the FoSA project. It is an online website meant for people who wish to look for specific or non-specific shoes/outfits in an interactive way. Users can choose to see our recommended outfits/shoes or choose their own shoes/outfits based on a list of filters provided by the website.
### 2.2 Product Functions
The pages within the website are designed as follows:

Home Page (index) - central point of navigation to the rest of the pages within the website
    • logo: our logo, redirects to the homepage
    • title: redirects to the homepage
    • login button: redirects to the login page
    • sidemenu: pulls out a menu containing the home, products, about and contact pages.
    • home: redirects to the home page
    • products & outfits: redirects to the filters page
    • about: redirects to the about page
    • contact: redirects to the contact page
    • subscribe email input: adds you to our list of subscribers for our newsletter if your email is valid

Login Page
    • logo: our logo, redirects to the homepage
    • title: redirects to the homepage
    • sidemenu: pulls out a menu containing the home, products, about and contact pages.
    • email input: accepts the email of the user
    • password input: accepts the password of the user
    • login: finalizes the login action, logging the user in if the credentials are correct, and then redirects them to the home page
    • register: redirects to the register page

Register Page
    • logo: our logo, redirects to the homepage
    • title: redirects to the homepage
    • sidemenu: pulls out a menu containing the home, products, about and contact pages.
    • username input: accepts the username of the user
    • email input: accepts the email of the user
    • password input: accepts the password of the user
    • confirm password input: checks that the two passwords match.
    • create aaccount button: finalizes the register action, registering the user in if the credentials are correct, and then redirects them to the home page
    • Sign in button: redirects to the login page

Filter Page - allows users to get the best footwear recommendations based on specific criteria or needs
    • logo: our logo, redirects to the homepage
    • title: redirects to the homepage
    • sidemenu: pulls out a menu containing the home, products, about and contact pages.
    • home: redirects to the home page
    • products & outfits: redirects to the filters page
    • about: redirects to the about page
    • contact: redirects to the contact page
    • logout button: redirects to the homepage
    • season filter: opens a dropdown menu with multiple season options, allowing users to select one or more seasons for filtering footwear options
    • weather filter: opens a dropdown menu with multiple weather options, allowing users to select one or more weather conditions for filtering footwear options
    • gender filter: opens a dropdown menu with multiple gender options, allowing users to select one or more genders for filtering footwear options
    • age filter: opens a dropdown menu with multiple age group options, allowing users to select one or more age groups for filtering footwear options
    • color filter: opens a dropdown menu with multiple color options, allowing users to select one or more colors for filtering footwear options
    • pattern filter: opens a dropdown menu with multiple pattern options, allowing users to select one or more patterns for filtering footwear options
    • shoe images: redirect to the specified shoe page

Shoe Page - provides detailed information about a specific shoe, including its photo, description, and any special features
    • logo: our logo, redirects to the homepage
    • title: redirects to the homepage
    • sidemenu: pulls out a menu containing the home, products, about and contact pages.
    • home: redirects to the home page
    • products & outfits: redirects to the filters page
    • about: redirects to the about page
    • contact: redirects to the contact page
    • logout button: redirects to the homepage
    • review input: accepts the review of the user
    • name input: accepts the name of the user
    • rating dropdown: selects the rating of the user
    • submit review: finalizes the review action, allowing users to submit their feedback and comments about the footwear product

About Page - provides information about a the shoe recommendation platform, including its mission and vision

Contact Page - provides the contact information of the platform (email, phone number and address)
### 2.3 User Classes and Characteristics
To be completed...
### 2.4 Operating Environment
The developed product can be used on any device with a connection to the Internet and a browser installed.
### 2.5 Design and Implementation Constraints
To be completed...
### 2.6 User Documentation
To be completed...
### 2.7 Assumptions and Dependencies
To be completed...
## External Interface Requirements
### 3.1 User Interfaces
![Home Page](document/screenshots/home_page.png)
![Login Page](document/screenshots/login_page.png)
![Register Page](document/screenshots/register_page.png)
![Buttons](document/screenshots/buttons.png)
![Filter Page](document/screenshots/filter_page_1.png)
![Shoe Page](document/screenshots/shoe_page_1.png)
![About Page](document/screenshots/about_page_1.png)
![Contact Page](document/screenshots/contact_page.png)

### 3.2 Hardware Interfaces
To be completed...
### 3.3 Software Interfaces
The minimum software requirements of Footwear Smart Assistant are a working browser and a connection to the Internet.
### 3.4 Communications Interfaces
Footwear Smart Assistant requires an Internet connection. The communication standard to be used is HTTP.
## System Features
### 4.1 Home Page
Users can login into their acoount, navigate to all other pages and subscribe to our newsletter.
### 4.2 Login Page
Users of our website can login by entering their credentials or register if they do not have an account and navigate to other pages from this page.
### 4.3 Register Page
Guests can create an account and then use it to log into the application and access all the features it provides and navigate to other pages from this page.
### 4.4 Filter Page
Users can get the best footwear recommendations based on specific criteria. They can select the filters that match their needs and navigate to other pages from this page.
### 4.5 Shoe Page
Users can get detailed information about a specific shoe, including its photo, description, and any special features. They can review the recommendation and also navigate to other pages from this page.
### 4.6 About Page
Users can get information about a the shoe recommendation platform, including its mission and vision and navigate to other pages from this page.
### 4.7 Contact Page
Users can get the contact information of the platform (email, phone number and address) and navigate to other pages from this page.
## Other Nonfunctional Requirements
### 5.1 Performance Requirements
To be completed...
### 5.2 Safety Requirements
To be completed...
### 5.3 Security Requirements
To be completed...
### 5.4 Software Quality Attributes
To be completed...
### 5.5 Business Rules
To be completed...
## Other Requirements
To be completed...
### Appendix A: Glossary
To be completed...
### Appendix B: Analysis Models
To be completed...
### Appendix C: To Be Determined List
To be completed...