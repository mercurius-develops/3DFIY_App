import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Navlinks } from "../components/Navlinks";
import { NavBtn } from "../components/NavBtn";
import { Footer } from "../components/Footer";

export const Terms = () => {
  return (
    <div>
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between">
          <Navbar />
          <NavBtn />
        </div>
        <Navlinks />
      </div>
      <div class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8 text-center">
          3Dify Sign Up Terms & Conditions
        </h1>
        <p class="text-gray-700 mb-4">
          Welcome to 3Dify! These Terms & Conditions ("Terms") govern your
          access and use of the 3Dify platform ("Platform"), including the
          website, mobile applications, and any related services offered by
          Mercurius Inc ("we," "us," or "our").
        </p>

        <section class="mb-8">
          <h2 class="text-xl font-bold mb-2">1. Eligibility</h2>
          <p class="text-gray-700 mb-4">
            You must be at least 18 years old or the legal age of majority in
            your jurisdiction to register and use the Platform. By using the
            Platform, you represent and warrant that you meet all eligibility
            requirements.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold mb-2">2. User Accounts</h2>
          <ul class="list-disc pl-4 mb-4">
            <li class="text-gray-700">
              You are responsible for maintaining the confidentiality of your
              account login credentials and for all activity that occurs under
              your account.
            </li>
            <li class="text-gray-700">
              You agree to notify us immediately of any unauthorized use of your
              account or any other security breach.
            </li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold mb-2">3. User Content</h2>
          <ul class="list-disc pl-4 mb-4">
            <li class="text-gray-700">
              You retain all ownership rights to any content you upload to the
              Platform ("User Content").
            </li>
            <li class="text-gray-700">
              By uploading User Content, you grant us a non-exclusive,
              worldwide, royalty-free license to use, reproduce, modify,
              publish, and distribute your User Content solely for the purposes
              of operating and promoting the Platform.
            </li>
            <li class="text-gray-700">
              You are solely responsible for the accuracy, completeness,
              legality, and reliability of your User Content.
            </li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold mb-2">4. Acceptable Use</h2>
          <ul class="list-disc pl-4 mb-4">
            <li class="text-gray-700">
              You agree to use the Platform only for lawful purposes and in
              accordance with these Terms.
            </li>
            <li class="text-gray-700">You will not:</li>
            <ul class="list-disc pl-6 mb-4">
              <li class="text-gray-700">
                Infringe on the intellectual property rights of others.
              </li>
              <li class="text-gray-700">
                Upload or share any content that is illegal, harmful,
                threatening, abusive, harassing, defamatory, obscene, hateful,
                or racially or ethnically offensive.
              </li>
              <li class="text-gray-700">
                Disrupt or interfere with the security or functionality of the
                Platform.
              </li>
              <li class="text-gray-700">
                Use the Platform for any commercial purposes without our express
                written consent.
              </li>
            </ul>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold mb-2">5. Intellectual Property</h2>
          <p class="text-gray-700 mb-4">
            The Platform and all content and materials included therein,
            including but not limited to text, graphics, logos, icons, images,
            software, and data (collectively, "Intellectual Property"), are the
            property of Mercurius Inc or its licensors. You may not use
            any Intellectual Property without our express written consent.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold mb-2">6. Disclaimer</h2>
          <p class="text-gray-700 mb-4">
            THE PLATFORM IS PROVIDED "AS IS" AND WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
            NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE PLATFORM WILL BE
            UNINTERRUPTED, ERROR-FREE, OR VIRUS-FREE.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold mb-2">7. Limitation of Liability</h2>
          <p class="text-gray-700 mb-4">
            WE SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
            SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR
            RELATED TO YOUR USE OF THE PLATFORM.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold mb-2">8. Termination</h2>
          <p class="text-gray-700 mb-4">
            We may terminate your access to the Platform at any time, for any
            reason, and without notice. You may terminate your account at any
            time.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold mb-2">9. Governing Law</h2>
          <p class="text-gray-700 mb-4">
            These Terms shall be governed by and construed in accordance with
            the laws of Pakistan.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold mb-2">10. Entire Agreement</h2>
          <p class="text-gray-700 mb-4">
            These Terms constitute the entire agreement between you and us
            regarding your use of the Platform.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold mb-2">11. Changes to Terms</h2>
          <p class="text-gray-700 mb-4">
            We may update these Terms at any time by posting the revised terms
            on the Platform. Your continued use of the Platform following the
            posting of revised Terms means that you accept and agree to the
            changes.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold mb-2">12. Contact Us</h2>
          <p class="text-gray-700 mb-4">
            If you have any questions about these Terms, please contact us at 
            <strong> <a href="mailto:contact@mercurius-inc.com">contact@mercurius-inc.com</a></strong> 
          </p>
        </section>
      </div>
      <Footer/>
    </div>
  );
};
