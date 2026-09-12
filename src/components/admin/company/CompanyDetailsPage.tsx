"use client";

import { useState } from "react";

import CompanyDetailItem from "./CompanyDetailItem";
import CompanyLogo from "@/components/admin/company/CompanyLogo";

import { ourStory } from "@/data/aboutUs";
import { missionVision } from "@/data/missionVision";
import { stats } from "@/data/stats";
import { footerData } from "@/data/footer";

export default function CompanyDetailsPage() {
  const [companyName, setCompanyName] = useState("LeafClutch");
  const [tagline, setTagline] = useState(ourStory.title);
  const [description, setDescription] = useState(ourStory.description);

  const [contact, setContact] = useState(footerData.contacts[0].value);
  const [sales, setSales] = useState(footerData.contacts[1].value);
  const [support, setSupport] = useState(footerData.contacts[2].value);
  const [email, setEmail] = useState(footerData.contacts[3].value);
  const [address, setAddress] = useState(footerData.contacts[4].value);

  const [facebook, setFacebook] = useState(
    footerData.socialLinks[0].href
  );
  const [instagram, setInstagram] = useState(
    footerData.socialLinks[1].href
  );
  const [linkedin, setLinkedin] = useState(
    footerData.socialLinks[2].href
  );
  const [youtube, setYoutube] = useState(
    footerData.socialLinks[3].href
  );

  const mission = missionVision.find(
    (item) => item.id === "mission"
  );

  const vision = missionVision.find(
    (item) => item.id === "vision"
  );

  return (
    <div className="space-y-8">
      {/* Branding */}
      <section className="rounded-2xl border border-[#DADEE7] bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-[#0F1729]">
            Company Branding
          </h2>

          <p className="mt-1 text-sm text-[#676F7E]">
            Manage the basic identity of your company.
          </p>
        </div>

        <div className="mt-6 space-y-4">
            <CompanyLogo />
          <CompanyDetailItem
            label="Company Name"
            value={companyName}
            onSave={(value) => {
              setCompanyName(value);
              console.log("Company Name:", value);
            }}
          />

          <CompanyDetailItem
            label="Tagline"
            value={tagline}
            onSave={(value) => {
              setTagline(value);
              console.log("Tagline:", value);
            }}
          />
        </div>
      </section>

      {/* About */}
      <section className="rounded-2xl border border-[#DADEE7] bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-[#0F1729]">
            About Company
          </h2>

          <p className="mt-1 text-sm text-[#676F7E]">
            Manage the public information about the company.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <CompanyDetailItem
            label="Description"
            value={description}
            multiline
            onSave={(value) => {
              setDescription(value);
              console.log("Description:", value);
            }}
          />

          <CompanyDetailItem
            label="Mission"
            value={mission?.description ?? ""}
            multiline
            onSave={(value) => {
              console.log("Mission:", value);
            }}
          />

          <CompanyDetailItem
            label="Vision"
            value={vision?.description ?? ""}
            multiline
            onSave={(value) => {
              console.log("Vision:", value);
            }}
          />
        </div>
      </section>

      {/* Statistics */}
      <section className="rounded-2xl border border-[#DADEE7] bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-[#0F1729]">
            Company Statistics
          </h2>

          <p className="mt-1 text-sm text-[#676F7E]">
            Manage the numbers displayed on the website.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {stats.map((stat) => (
            <CompanyDetailItem
              key={stat.id}
              label={`${stat.label} ${stat.description}`}
              value={stat.value}
              onSave={(value) => {
                console.log(`Update ${stat.id}:`, value);
              }}
            />
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="rounded-2xl border border-[#DADEE7] bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-[#0F1729]">
            Contact Information
          </h2>

          <p className="mt-1 text-sm text-[#676F7E]">
            Manage the contact information displayed across the website.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <CompanyDetailItem
            label="Contact"
            value={contact}
            onSave={(value) => {
              setContact(value);
              console.log("Contact:", value);
            }}
          />

          <CompanyDetailItem
            label="Sales / Marketing"
            value={sales}
            onSave={(value) => {
              setSales(value);
              console.log("Sales:", value);
            }}
          />

          <CompanyDetailItem
            label="Support"
            value={support}
            onSave={(value) => {
              setSupport(value);
              console.log("Support:", value);
            }}
          />

          <CompanyDetailItem
            label="Email"
            value={email}
            onSave={(value) => {
              setEmail(value);
              console.log("Email:", value);
            }}
          />

          <CompanyDetailItem
            label="Address"
            value={address}
            multiline
            onSave={(value) => {
              setAddress(value);
              console.log("Address:", value);
            }}
          />
        </div>
      </section>

      {/* Social Links */}
      <section className="rounded-2xl border border-[#DADEE7] bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-[#0F1729]">
            Social Links
          </h2>

          <p className="mt-1 text-sm text-[#676F7E]">
            Manage the company's social media links.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <CompanyDetailItem
            label="Facebook"
            value={facebook}
            onSave={(value) => {
              setFacebook(value);
              console.log("Facebook:", value);
            }}
          />

          <CompanyDetailItem
            label="Instagram"
            value={instagram}
            onSave={(value) => {
              setInstagram(value);
              console.log("Instagram:", value);
            }}
          />

          <CompanyDetailItem
            label="LinkedIn"
            value={linkedin}
            onSave={(value) => {
              setLinkedin(value);
              console.log("LinkedIn:", value);
            }}
          />

          <CompanyDetailItem
            label="YouTube"
            value={youtube}
            onSave={(value) => {
              setYoutube(value);
              console.log("YouTube:", value);
            }}
          />
        </div>
      </section>
    </div>
  );
}