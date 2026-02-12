import { useState, useEffect, useRef, useCallback } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import axios from 'axios';
import Card from '@/components/product/card';
import Layout from '@/layouts/_layout';
import type { GetStaticProps } from 'next';
import ProductsUltraPremiumFilter from '@/components/filter/filter';
import Seo from '@/layouts/_seo';
import routes from '@/config/routes';
import { getAuthToken, removeAuthToken } from '../../data/client/token.utils';
import Image from '@/components/ui/image';
import {CheckCircle, XCircle} from 'lucide-react'

var pays =
  [
    {
      "id": 1,
      "name": "Afghanistan",
      "slug": "afghanistan",
      "code": "AF",
      "iso3": "AFG",
      "phone_code": "+93",
      "currency": "AFN",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/af.svg",
      "created_at": "2025-09-15T06:30:32.000Z"
    },
    {
      "id": 160,
      "name": "Afrique du Sud",
      "slug": "afrique-du-sud",
      "code": "ZA",
      "iso3": "ZAF",
      "phone_code": "+27",
      "currency": "ZAR",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/za.svg",
      "created_at": "2025-09-15T06:31:06.000Z"
    },
    {
      "id": 2,
      "name": "Albanie",
      "slug": "albanie",
      "code": "AL",
      "iso3": "ALB",
      "phone_code": "+355",
      "currency": "ALL",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/al.svg",
      "created_at": "2025-09-15T06:30:32.000Z"
    },
    {
      "id": 3,
      "name": "Algérie",
      "slug": "algerie",
      "code": "DZ",
      "iso3": "DZA",
      "phone_code": "+213",
      "currency": "DZD",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/dz.svg",
      "created_at": "2025-09-15T06:30:33.000Z"
    },
    {
      "id": 64,
      "name": "Allemagne",
      "slug": "allemagne",
      "code": "DE",
      "iso3": "DEU",
      "phone_code": "+49",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/de.svg",
      "created_at": "2025-09-15T06:30:45.000Z"
    },
    {
      "id": 4,
      "name": "Andorre",
      "slug": "andorre",
      "code": "AD",
      "iso3": "AND",
      "phone_code": "+376",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/ad.svg",
      "created_at": "2025-09-15T06:30:33.000Z"
    },
    {
      "id": 5,
      "name": "Angola",
      "slug": "angola",
      "code": "AO",
      "iso3": "AGO",
      "phone_code": "+244",
      "currency": "AOA",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/ao.svg",
      "created_at": "2025-09-15T06:30:33.000Z"
    },
    {
      "id": 6,
      "name": "Antigua-et-Barbuda",
      "slug": "antigua-et-barbuda",
      "code": "AG",
      "iso3": "ATG",
      "phone_code": "+1268",
      "currency": "XCD",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/ag.svg",
      "created_at": "2025-09-15T06:30:33.000Z"
    },
    {
      "id": 150,
      "name": "Arabie saoudite",
      "slug": "arabie-saoudite",
      "code": "SA",
      "iso3": "SAU",
      "phone_code": "+966",
      "currency": "SAR",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/sa.svg",
      "created_at": "2025-09-15T06:31:04.000Z"
    },
    {
      "id": 7,
      "name": "Argentine",
      "slug": "argentine",
      "code": "AR",
      "iso3": "ARG",
      "phone_code": "+54",
      "currency": "ARS",
      "continent": "South America",
      "flag_url": "https://flagcdn.com/ar.svg",
      "created_at": "2025-09-15T06:30:33.000Z"
    },
    {
      "id": 8,
      "name": "Arménie",
      "slug": "armenie",
      "code": "AM",
      "iso3": "ARM",
      "phone_code": "+374",
      "currency": "AMD",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/am.svg",
      "created_at": "2025-09-15T06:30:34.000Z"
    },
    {
      "id": 9,
      "name": "Australie",
      "slug": "australie",
      "code": "AU",
      "iso3": "AUS",
      "phone_code": "+61",
      "currency": "AUD",
      "continent": "Oceania",
      "flag_url": "https://flagcdn.com/au.svg",
      "created_at": "2025-09-15T06:30:34.000Z"
    },
    {
      "id": 10,
      "name": "Autriche",
      "slug": "autriche",
      "code": "AT",
      "iso3": "AUT",
      "phone_code": "+43",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/at.svg",
      "created_at": "2025-09-15T06:30:34.000Z"
    },
    {
      "id": 11,
      "name": "Azerbaïdjan",
      "slug": "azerbaidjan",
      "code": "AZ",
      "iso3": "AZE",
      "phone_code": "+994",
      "currency": "AZN",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/az.svg",
      "created_at": "2025-09-15T06:30:34.000Z"
    },
    {
      "id": 12,
      "name": "Bahamas",
      "slug": "bahamas",
      "code": "BS",
      "iso3": "BHS",
      "phone_code": "+1242",
      "currency": "BSD",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/bs.svg",
      "created_at": "2025-09-15T06:30:35.000Z"
    },
    {
      "id": 13,
      "name": "Bahreïn",
      "slug": "bahrein",
      "code": "BH",
      "iso3": "BHR",
      "phone_code": "+973",
      "currency": "BHD",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/bh.svg",
      "created_at": "2025-09-15T06:30:36.000Z"
    },
    {
      "id": 14,
      "name": "Bangladesh",
      "slug": "bangladesh",
      "code": "BD",
      "iso3": "BGD",
      "phone_code": "+880",
      "currency": "BDT",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/bd.svg",
      "created_at": "2025-09-15T06:30:36.000Z"
    },
    {
      "id": 15,
      "name": "Barbade",
      "slug": "barbade",
      "code": "BB",
      "iso3": "BRB",
      "phone_code": "+1246",
      "currency": "BBD",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/bb.svg",
      "created_at": "2025-09-15T06:30:36.000Z"
    },
    {
      "id": 17,
      "name": "Belgique",
      "slug": "belgique",
      "code": "BE",
      "iso3": "BEL",
      "phone_code": "+32",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/be.svg",
      "created_at": "2025-09-15T06:30:36.000Z"
    },
    {
      "id": 18,
      "name": "Belize",
      "slug": "belize",
      "code": "BZ",
      "iso3": "BLZ",
      "phone_code": "+501",
      "currency": "BZD",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/bz.svg",
      "created_at": "2025-09-15T06:30:36.000Z"
    },
    {
      "id": 19,
      "name": "Bénin",
      "slug": "benin",
      "code": "BJ",
      "iso3": "BEN",
      "phone_code": "+229",
      "currency": "XOF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/bj.svg",
      "created_at": "2025-09-15T06:30:37.000Z"
    },
    {
      "id": 20,
      "name": "Bhoutan",
      "slug": "bhoutan",
      "code": "BT",
      "iso3": "BTN",
      "phone_code": "+975",
      "currency": "BTN",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/bt.svg",
      "created_at": "2025-09-15T06:30:37.000Z"
    },
    {
      "id": 16,
      "name": "Biélorussie",
      "slug": "bielorussie",
      "code": "BY",
      "iso3": "BLR",
      "phone_code": "+375",
      "currency": "BYN",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/by.svg",
      "created_at": "2025-09-15T06:30:36.000Z"
    },
    {
      "id": 21,
      "name": "Bolivie",
      "slug": "bolivie",
      "code": "BO",
      "iso3": "BOL",
      "phone_code": "+591",
      "currency": "BOB",
      "continent": "South America",
      "flag_url": "https://flagcdn.com/bo.svg",
      "created_at": "2025-09-15T06:30:38.000Z"
    },
    {
      "id": 22,
      "name": "Bosnie-Herzégovine",
      "slug": "bosnie-herzegovine",
      "code": "BA",
      "iso3": "BIH",
      "phone_code": "+387",
      "currency": "BAM",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/ba.svg",
      "created_at": "2025-09-15T06:30:38.000Z"
    },
    {
      "id": 23,
      "name": "Botswana",
      "slug": "botswana",
      "code": "BW",
      "iso3": "BWA",
      "phone_code": "+267",
      "currency": "BWP",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/bw.svg",
      "created_at": "2025-09-15T06:30:38.000Z"
    },
    {
      "id": 24,
      "name": "Brésil",
      "slug": "bresil",
      "code": "BR",
      "iso3": "BRA",
      "phone_code": "+55",
      "currency": "BRL",
      "continent": "South America",
      "flag_url": "https://flagcdn.com/br.svg",
      "created_at": "2025-09-15T06:30:38.000Z"
    },
    {
      "id": 25,
      "name": "Brunei",
      "slug": "brunei",
      "code": "BN",
      "iso3": "BRN",
      "phone_code": "+673",
      "currency": "BND",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/bn.svg",
      "created_at": "2025-09-15T06:30:39.000Z"
    },
    {
      "id": 26,
      "name": "Bulgarie",
      "slug": "bulgarie",
      "code": "BG",
      "iso3": "BGR",
      "phone_code": "+359",
      "currency": "BGN",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/bg.svg",
      "created_at": "2025-09-15T06:30:39.000Z"
    },
    {
      "id": 27,
      "name": "Burkina Faso",
      "slug": "burkina-faso",
      "code": "BF",
      "iso3": "BFA",
      "phone_code": "+226",
      "currency": "XOF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/bf.svg",
      "created_at": "2025-09-15T06:30:39.000Z"
    },
    {
      "id": 28,
      "name": "Burundi",
      "slug": "burundi",
      "code": "BI",
      "iso3": "BDI",
      "phone_code": "+257",
      "currency": "BIF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/bi.svg",
      "created_at": "2025-09-15T06:30:39.000Z"
    },
    {
      "id": 29,
      "name": "Cabo Verde",
      "slug": "cabo-verde",
      "code": "CV",
      "iso3": "CPV",
      "phone_code": "+238",
      "currency": "CVE",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/cv.svg",
      "created_at": "2025-09-15T06:30:39.000Z"
    },
    {
      "id": 30,
      "name": "Cambodge",
      "slug": "cambodge",
      "code": "KH",
      "iso3": "KHM",
      "phone_code": "+855",
      "currency": "KHR",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/kh.svg",
      "created_at": "2025-09-15T06:30:39.000Z"
    },
    {
      "id": 31,
      "name": "Cameroun",
      "slug": "cameroun",
      "code": "CM",
      "iso3": "CMR",
      "phone_code": "+237",
      "currency": "XAF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/cm.svg",
      "created_at": "2025-09-15T06:30:40.000Z"
    },
    {
      "id": 32,
      "name": "Canada",
      "slug": "canada",
      "code": "CA",
      "iso3": "CAN",
      "phone_code": "+1",
      "currency": "CAD",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/ca.svg",
      "created_at": "2025-09-15T06:30:40.000Z"
    },
    {
      "id": 35,
      "name": "Chili",
      "slug": "chili",
      "code": "CL",
      "iso3": "CHL",
      "phone_code": "+56",
      "currency": "CLP",
      "continent": "South America",
      "flag_url": "https://flagcdn.com/cl.svg",
      "created_at": "2025-09-15T06:30:40.000Z"
    },
    {
      "id": 36,
      "name": "Chine",
      "slug": "chine",
      "code": "CN",
      "iso3": "CHN",
      "phone_code": "+86",
      "currency": "CNY",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/cn.svg",
      "created_at": "2025-09-15T06:30:40.000Z"
    },
    {
      "id": 44,
      "name": "Chypre",
      "slug": "chypre",
      "code": "CY",
      "iso3": "CYP",
      "phone_code": "+357",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/cy.svg",
      "created_at": "2025-09-15T06:30:42.000Z"
    },
    {
      "id": 37,
      "name": "Colombie",
      "slug": "colombie",
      "code": "CO",
      "iso3": "COL",
      "phone_code": "+57",
      "currency": "COP",
      "continent": "South America",
      "flag_url": "https://flagcdn.com/co.svg",
      "created_at": "2025-09-15T06:30:41.000Z"
    },
    {
      "id": 38,
      "name": "Comores",
      "slug": "comores",
      "code": "KM",
      "iso3": "COM",
      "phone_code": "+269",
      "currency": "KMF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/km.svg",
      "created_at": "2025-09-15T06:30:41.000Z"
    },
    {
      "id": 39,
      "name": "Congo (Brazzaville)",
      "slug": "congo-brazzaville",
      "code": "CG",
      "iso3": "COG",
      "phone_code": "+242",
      "currency": "XAF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/cg.svg",
      "created_at": "2025-09-15T06:30:41.000Z"
    },
    {
      "id": 40,
      "name": "Congo (Kinshasa)",
      "slug": "congo-kinshasa",
      "code": "CD",
      "iso3": "COD",
      "phone_code": "+243",
      "currency": "CDF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/cd.svg",
      "created_at": "2025-09-15T06:30:41.000Z"
    },
    {
      "id": 89,
      "name": "Corée du Nord",
      "slug": "coree-du-nord",
      "code": "KP",
      "iso3": "PRK",
      "phone_code": "+850",
      "currency": "KPW",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/kp.svg",
      "created_at": "2025-09-15T06:30:50.000Z"
    },
    {
      "id": 90,
      "name": "Corée du Sud",
      "slug": "coree-du-sud",
      "code": "KR",
      "iso3": "KOR",
      "phone_code": "+82",
      "currency": "KRW",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/kr.svg",
      "created_at": "2025-09-15T06:30:50.000Z"
    },
    {
      "id": 41,
      "name": "Costa Rica",
      "slug": "costa-rica",
      "code": "CR",
      "iso3": "CRI",
      "phone_code": "+506",
      "currency": "CRC",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/cr.svg",
      "created_at": "2025-09-15T06:30:41.000Z"
    },
    {
      "id": 42,
      "name": "Croatie",
      "slug": "croatie",
      "code": "HR",
      "iso3": "HRV",
      "phone_code": "+385",
      "currency": "HRK",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/hr.svg",
      "created_at": "2025-09-15T06:30:42.000Z"
    },
    {
      "id": 43,
      "name": "Cuba",
      "slug": "cuba",
      "code": "CU",
      "iso3": "CUB",
      "phone_code": "+53",
      "currency": "CUP",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/cu.svg",
      "created_at": "2025-09-15T06:30:42.000Z"
    },
    {
      "id": 46,
      "name": "Danemark",
      "slug": "danemark",
      "code": "DK",
      "iso3": "DNK",
      "phone_code": "+45",
      "currency": "DKK",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/dk.svg",
      "created_at": "2025-09-15T06:30:42.000Z"
    },
    {
      "id": 47,
      "name": "Djibouti",
      "slug": "djibouti",
      "code": "DJ",
      "iso3": "DJI",
      "phone_code": "+253",
      "currency": "DJF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/dj.svg",
      "created_at": "2025-09-15T06:30:42.000Z"
    },
    {
      "id": 48,
      "name": "Dominique",
      "slug": "dominique",
      "code": "DM",
      "iso3": "DMA",
      "phone_code": "+1767",
      "currency": "XCD",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/dm.svg",
      "created_at": "2025-09-15T06:30:43.000Z"
    },
    {
      "id": 51,
      "name": "Égypte",
      "slug": "egypte",
      "code": "EG",
      "iso3": "EGY",
      "phone_code": "+20",
      "currency": "EGP",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/eg.svg",
      "created_at": "2025-09-15T06:30:43.000Z"
    },
    {
      "id": 52,
      "name": "El Salvador",
      "slug": "el-salvador",
      "code": "SV",
      "iso3": "SLV",
      "phone_code": "+503",
      "currency": "SVC",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/sv.svg",
      "created_at": "2025-09-15T06:30:43.000Z"
    },
    {
      "id": 183,
      "name": "Émirats arabes unis",
      "slug": "emirats-arabes-unis",
      "code": "AE",
      "iso3": "ARE",
      "phone_code": "+971",
      "currency": "AED",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/ae.svg",
      "created_at": "2025-09-15T06:31:11.000Z"
    },
    {
      "id": 50,
      "name": "Équateur",
      "slug": "equateur",
      "code": "EC",
      "iso3": "ECU",
      "phone_code": "+593",
      "currency": "USD",
      "continent": "South America",
      "flag_url": "https://flagcdn.com/ec.svg",
      "created_at": "2025-09-15T06:30:43.000Z"
    },
    {
      "id": 54,
      "name": "Érythrée",
      "slug": "erythree",
      "code": "ER",
      "iso3": "ERI",
      "phone_code": "+291",
      "currency": "ERN",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/er.svg",
      "created_at": "2025-09-15T06:30:44.000Z"
    },
    {
      "id": 162,
      "name": "Espagne",
      "slug": "espagne",
      "code": "ES",
      "iso3": "ESP",
      "phone_code": "+34",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/es.svg",
      "created_at": "2025-09-15T06:31:07.000Z"
    },
    {
      "id": 55,
      "name": "Estonie",
      "slug": "estonie",
      "code": "EE",
      "iso3": "EST",
      "phone_code": "+372",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/ee.svg",
      "created_at": "2025-09-15T06:30:44.000Z"
    },
    {
      "id": 56,
      "name": "Eswatini",
      "slug": "eswatini",
      "code": "SZ",
      "iso3": "SWZ",
      "phone_code": "+268",
      "currency": "SZL",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/sz.svg",
      "created_at": "2025-09-15T06:30:44.000Z"
    },
    {
      "id": 185,
      "name": "États-Unis",
      "slug": "etats-unis",
      "code": "US",
      "iso3": "USA",
      "phone_code": "+1",
      "currency": "USD",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/us.svg",
      "created_at": "2025-09-15T06:31:12.000Z"
    },
    {
      "id": 57,
      "name": "Éthiopie",
      "slug": "ethiopie",
      "code": "ET",
      "iso3": "ETH",
      "phone_code": "+251",
      "currency": "ETB",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/et.svg",
      "created_at": "2025-09-15T06:30:44.000Z"
    },
    {
      "id": 58,
      "name": "Fidji",
      "slug": "fidji",
      "code": "FJ",
      "iso3": "FJI",
      "phone_code": "+679",
      "currency": "FJD",
      "continent": "Oceania",
      "flag_url": "https://flagcdn.com/fj.svg",
      "created_at": "2025-09-15T06:30:44.000Z"
    },
    {
      "id": 59,
      "name": "Finlande",
      "slug": "finlande",
      "code": "FI",
      "iso3": "FIN",
      "phone_code": "+358",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/fi.svg",
      "created_at": "2025-09-15T06:30:45.000Z"
    },
    {
      "id": 60,
      "name": "France",
      "slug": "france",
      "code": "FR",
      "iso3": "FRA",
      "phone_code": "+33",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/fr.svg",
      "created_at": "2025-09-15T06:30:45.000Z"
    },
    {
      "id": 61,
      "name": "Gabon",
      "slug": "gabon",
      "code": "GA",
      "iso3": "GAB",
      "phone_code": "+241",
      "currency": "XAF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/ga.svg",
      "created_at": "2025-09-15T06:30:45.000Z"
    },
    {
      "id": 62,
      "name": "Gambie",
      "slug": "gambie",
      "code": "GM",
      "iso3": "GMB",
      "phone_code": "+220",
      "currency": "GMD",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/gm.svg",
      "created_at": "2025-09-15T06:30:45.000Z"
    },
    {
      "id": 63,
      "name": "Géorgie",
      "slug": "georgie",
      "code": "GE",
      "iso3": "GEO",
      "phone_code": "+995",
      "currency": "GEL",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/ge.svg",
      "created_at": "2025-09-15T06:30:45.000Z"
    },
    {
      "id": 65,
      "name": "Ghana",
      "slug": "ghana",
      "code": "GH",
      "iso3": "GHA",
      "phone_code": "+233",
      "currency": "GHS",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/gh.svg",
      "created_at": "2025-09-15T06:30:46.000Z"
    },
    {
      "id": 66,
      "name": "Grèce",
      "slug": "grece",
      "code": "GR",
      "iso3": "GRC",
      "phone_code": "+30",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/gr.svg",
      "created_at": "2025-09-15T06:30:46.000Z"
    },
    {
      "id": 67,
      "name": "Grenade",
      "slug": "grenade",
      "code": "GD",
      "iso3": "GRD",
      "phone_code": "+1473",
      "currency": "XCD",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/gd.svg",
      "created_at": "2025-09-15T06:30:46.000Z"
    },
    {
      "id": 68,
      "name": "Guatemala",
      "slug": "guatemala",
      "code": "GT",
      "iso3": "GTM",
      "phone_code": "+502",
      "currency": "GTQ",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/gt.svg",
      "created_at": "2025-09-15T06:30:46.000Z"
    },
    {
      "id": 69,
      "name": "Guinée",
      "slug": "guinee",
      "code": "GN",
      "iso3": "GIN",
      "phone_code": "+224",
      "currency": "GNF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/gn.svg",
      "created_at": "2025-09-15T06:30:46.000Z"
    },
    {
      "id": 53,
      "name": "Guinée équatoriale",
      "slug": "guinee-equatoriale",
      "code": "GQ",
      "iso3": "GNQ",
      "phone_code": "+240",
      "currency": "XAF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/gq.svg",
      "created_at": "2025-09-15T06:30:43.000Z"
    },
    {
      "id": 70,
      "name": "Guinée-Bissau",
      "slug": "guinee-bissau",
      "code": "GW",
      "iso3": "GNB",
      "phone_code": "+245",
      "currency": "XOF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/gw.svg",
      "created_at": "2025-09-15T06:30:47.000Z"
    },
    {
      "id": 71,
      "name": "Guyana",
      "slug": "guyana",
      "code": "GY",
      "iso3": "GUY",
      "phone_code": "+592",
      "currency": "GYD",
      "continent": "South America",
      "flag_url": "https://flagcdn.com/gy.svg",
      "created_at": "2025-09-15T06:30:47.000Z"
    },
    {
      "id": 72,
      "name": "Haïti",
      "slug": "haiti",
      "code": "HT",
      "iso3": "HTI",
      "phone_code": "+509",
      "currency": "HTG",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/ht.svg",
      "created_at": "2025-09-15T06:30:47.000Z"
    },
    {
      "id": 73,
      "name": "Honduras",
      "slug": "honduras",
      "code": "HN",
      "iso3": "HND",
      "phone_code": "+504",
      "currency": "HNL",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/hn.svg",
      "created_at": "2025-09-15T06:30:47.000Z"
    },
    {
      "id": 74,
      "name": "Hongrie",
      "slug": "hongrie",
      "code": "HU",
      "iso3": "HUN",
      "phone_code": "+36",
      "currency": "HUF",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/hu.svg",
      "created_at": "2025-09-15T06:30:47.000Z"
    },
    {
      "id": 109,
      "name": "Îles Marshall",
      "slug": "iles-marshall",
      "code": "MH",
      "iso3": "MHL",
      "phone_code": "+692",
      "currency": "USD",
      "continent": "Oceania",
      "flag_url": "https://flagcdn.com/mh.svg",
      "created_at": "2025-09-15T06:30:55.000Z"
    },
    {
      "id": 158,
      "name": "Îles Salomon",
      "slug": "iles-salomon",
      "code": "SB",
      "iso3": "SLB",
      "phone_code": "+677",
      "currency": "SBD",
      "continent": "Oceania",
      "flag_url": "https://flagcdn.com/sb.svg",
      "created_at": "2025-09-15T06:31:06.000Z"
    },
    {
      "id": 76,
      "name": "Inde",
      "slug": "inde",
      "code": "IN",
      "iso3": "IND",
      "phone_code": "+91",
      "currency": "INR",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/in.svg",
      "created_at": "2025-09-15T06:30:48.000Z"
    },
    {
      "id": 77,
      "name": "Indonésie",
      "slug": "indonesie",
      "code": "ID",
      "iso3": "IDN",
      "phone_code": "+62",
      "currency": "IDR",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/id.svg",
      "created_at": "2025-09-15T06:30:48.000Z"
    },
    {
      "id": 79,
      "name": "Irak",
      "slug": "irak",
      "code": "IQ",
      "iso3": "IRQ",
      "phone_code": "+964",
      "currency": "IQD",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/iq.svg",
      "created_at": "2025-09-15T06:30:48.000Z"
    },
    {
      "id": 78,
      "name": "Iran",
      "slug": "iran",
      "code": "IR",
      "iso3": "IRN",
      "phone_code": "+98",
      "currency": "IRR",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/ir.svg",
      "created_at": "2025-09-15T06:30:48.000Z"
    },
    {
      "id": 80,
      "name": "Irlande",
      "slug": "irlande",
      "code": "IE",
      "iso3": "IRL",
      "phone_code": "+353",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/ie.svg",
      "created_at": "2025-09-15T06:30:48.000Z"
    },
    {
      "id": 75,
      "name": "Islande",
      "slug": "islande",
      "code": "IS",
      "iso3": "ISL",
      "phone_code": "+354",
      "currency": "ISK",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/is.svg",
      "created_at": "2025-09-15T06:30:47.000Z"
    },
    {
      "id": 81,
      "name": "Israël",
      "slug": "israel",
      "code": "IL",
      "iso3": "ISR",
      "phone_code": "+972",
      "currency": "ILS",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/il.svg",
      "created_at": "2025-09-15T06:30:48.000Z"
    },
    {
      "id": 82,
      "name": "Italie",
      "slug": "italie",
      "code": "IT",
      "iso3": "ITA",
      "phone_code": "+39",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/it.svg",
      "created_at": "2025-09-15T06:30:49.000Z"
    },
    {
      "id": 83,
      "name": "Jamaïque",
      "slug": "jamaïque",
      "code": "JM",
      "iso3": "JAM",
      "phone_code": "+1876",
      "currency": "JMD",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/jm.svg",
      "created_at": "2025-09-15T06:30:49.000Z"
    },
    {
      "id": 84,
      "name": "Japon",
      "slug": "japon",
      "code": "JP",
      "iso3": "JPN",
      "phone_code": "+81",
      "currency": "JPY",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/jp.svg",
      "created_at": "2025-09-15T06:30:49.000Z"
    },
    {
      "id": 85,
      "name": "Jordanie",
      "slug": "jordanie",
      "code": "JO",
      "iso3": "JOR",
      "phone_code": "+962",
      "currency": "JOD",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/jo.svg",
      "created_at": "2025-09-15T06:30:49.000Z"
    },
    {
      "id": 86,
      "name": "Kazakhstan",
      "slug": "kazakhstan",
      "code": "KZ",
      "iso3": "KAZ",
      "phone_code": "+7",
      "currency": "KZT",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/kz.svg",
      "created_at": "2025-09-15T06:30:49.000Z"
    },
    {
      "id": 87,
      "name": "Kenya",
      "slug": "kenya",
      "code": "KE",
      "iso3": "KEN",
      "phone_code": "+254",
      "currency": "KES",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/ke.svg",
      "created_at": "2025-09-15T06:30:49.000Z"
    },
    {
      "id": 92,
      "name": "Kirghizistan",
      "slug": "kirghizistan",
      "code": "KG",
      "iso3": "KGZ",
      "phone_code": "+996",
      "currency": "KGS",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/kg.svg",
      "created_at": "2025-09-15T06:30:50.000Z"
    },
    {
      "id": 88,
      "name": "Kiribati",
      "slug": "kiribati",
      "code": "KI",
      "iso3": "KIR",
      "phone_code": "+686",
      "currency": "AUD",
      "continent": "Oceania",
      "flag_url": "https://flagcdn.com/ki.svg",
      "created_at": "2025-09-15T06:30:50.000Z"
    },
    {
      "id": 91,
      "name": "Koweït",
      "slug": "koweit",
      "code": "KW",
      "iso3": "KWT",
      "phone_code": "+965",
      "currency": "KWD",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/kw.svg",
      "created_at": "2025-09-15T06:30:50.000Z"
    },
    {
      "id": 93,
      "name": "Laos",
      "slug": "laos",
      "code": "LA",
      "iso3": "LAO",
      "phone_code": "+856",
      "currency": "LAK",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/la.svg",
      "created_at": "2025-09-15T06:30:51.000Z"
    },
    {
      "id": 96,
      "name": "Lesotho",
      "slug": "lesotho",
      "code": "LS",
      "iso3": "LSO",
      "phone_code": "+266",
      "currency": "LSL",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/ls.svg",
      "created_at": "2025-09-15T06:30:52.000Z"
    },
    {
      "id": 94,
      "name": "Lettonie",
      "slug": "lettonie",
      "code": "LV",
      "iso3": "LVA",
      "phone_code": "+371",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/lv.svg",
      "created_at": "2025-09-15T06:30:51.000Z"
    },
    {
      "id": 95,
      "name": "Liban",
      "slug": "liban",
      "code": "LB",
      "iso3": "LBN",
      "phone_code": "+961",
      "currency": "LBP",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/lb.svg",
      "created_at": "2025-09-15T06:30:52.000Z"
    },
    {
      "id": 97,
      "name": "Libéria",
      "slug": "liberia",
      "code": "LR",
      "iso3": "LBR",
      "phone_code": "+231",
      "currency": "LRD",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/lr.svg",
      "created_at": "2025-09-15T06:30:53.000Z"
    },
    {
      "id": 98,
      "name": "Libye",
      "slug": "libye",
      "code": "LY",
      "iso3": "LBY",
      "phone_code": "+218",
      "currency": "LYD",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/ly.svg",
      "created_at": "2025-09-15T06:30:53.000Z"
    },
    {
      "id": 99,
      "name": "Liechtenstein",
      "slug": "liechtenstein",
      "code": "LI",
      "iso3": "LIE",
      "phone_code": "+423",
      "currency": "CHF",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/li.svg",
      "created_at": "2025-09-15T06:30:53.000Z"
    },
    {
      "id": 100,
      "name": "Lituanie",
      "slug": "lituanie",
      "code": "LT",
      "iso3": "LTU",
      "phone_code": "+370",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/lt.svg",
      "created_at": "2025-09-15T06:30:54.000Z"
    },
    {
      "id": 101,
      "name": "Luxembourg",
      "slug": "luxembourg",
      "code": "LU",
      "iso3": "LUX",
      "phone_code": "+352",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/lu.svg",
      "created_at": "2025-09-15T06:30:54.000Z"
    },
    {
      "id": 102,
      "name": "Macédoine du Nord",
      "slug": "macedoine-du-nord",
      "code": "MK",
      "iso3": "MKD",
      "phone_code": "+389",
      "currency": "MKD",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/mk.svg",
      "created_at": "2025-09-15T06:30:54.000Z"
    },
    {
      "id": 103,
      "name": "Madagascar",
      "slug": "madagascar",
      "code": "MG",
      "iso3": "MDG",
      "phone_code": "+261",
      "currency": "MGA",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/mg.svg",
      "created_at": "2025-09-15T06:30:54.000Z"
    },
    {
      "id": 105,
      "name": "Malaisie",
      "slug": "malaisie",
      "code": "MY",
      "iso3": "MYS",
      "phone_code": "+60",
      "currency": "MYR",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/my.svg",
      "created_at": "2025-09-15T06:30:55.000Z"
    },
    {
      "id": 104,
      "name": "Malawi",
      "slug": "malawi",
      "code": "MW",
      "iso3": "MWI",
      "phone_code": "+265",
      "currency": "MWK",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/mw.svg",
      "created_at": "2025-09-15T06:30:54.000Z"
    },
    {
      "id": 106,
      "name": "Maldives",
      "slug": "maldives",
      "code": "MV",
      "iso3": "MDV",
      "phone_code": "+960",
      "currency": "MVR",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/mv.svg",
      "created_at": "2025-09-15T06:30:55.000Z"
    },
    {
      "id": 107,
      "name": "Mali",
      "slug": "mali",
      "code": "ML",
      "iso3": "MLI",
      "phone_code": "+223",
      "currency": "XOF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/ml.svg",
      "created_at": "2025-09-15T06:30:55.000Z"
    },
    {
      "id": 108,
      "name": "Malte",
      "slug": "malte",
      "code": "MT",
      "iso3": "MLT",
      "phone_code": "+356",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/mt.svg",
      "created_at": "2025-09-15T06:30:55.000Z"
    },
    {
      "id": 118,
      "name": "Maroc",
      "slug": "maroc",
      "code": "MA",
      "iso3": "MAR",
      "phone_code": "+212",
      "currency": "MAD",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/ma.svg",
      "created_at": "2025-09-15T06:30:58.000Z"
    },
    {
      "id": 111,
      "name": "Maurice",
      "slug": "maurice",
      "code": "MU",
      "iso3": "MUS",
      "phone_code": "+230",
      "currency": "MUR",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/mu.svg",
      "created_at": "2025-09-15T06:30:56.000Z"
    },
    {
      "id": 110,
      "name": "Mauritanie",
      "slug": "mauritanie",
      "code": "MR",
      "iso3": "MRT",
      "phone_code": "+222",
      "currency": "MRU",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/mr.svg",
      "created_at": "2025-09-15T06:30:56.000Z"
    },
    {
      "id": 112,
      "name": "Mexique",
      "slug": "mexique",
      "code": "MX",
      "iso3": "MEX",
      "phone_code": "+52",
      "currency": "MXN",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/mx.svg",
      "created_at": "2025-09-15T06:30:57.000Z"
    },
    {
      "id": 113,
      "name": "Micronésie",
      "slug": "micronesie",
      "code": "FM",
      "iso3": "FSM",
      "phone_code": "+691",
      "currency": "USD",
      "continent": "Oceania",
      "flag_url": "https://flagcdn.com/fm.svg",
      "created_at": "2025-09-15T06:30:57.000Z"
    },
    {
      "id": 114,
      "name": "Moldavie",
      "slug": "moldavie",
      "code": "MD",
      "iso3": "MDA",
      "phone_code": "+373",
      "currency": "MDL",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/md.svg",
      "created_at": "2025-09-15T06:30:57.000Z"
    },
    {
      "id": 115,
      "name": "Monaco",
      "slug": "monaco",
      "code": "MC",
      "iso3": "MCO",
      "phone_code": "+377",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/mc.svg",
      "created_at": "2025-09-15T06:30:57.000Z"
    },
    {
      "id": 116,
      "name": "Mongolie",
      "slug": "mongolie",
      "code": "MN",
      "iso3": "MNG",
      "phone_code": "+976",
      "currency": "MNT",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/mn.svg",
      "created_at": "2025-09-15T06:30:58.000Z"
    },
    {
      "id": 117,
      "name": "Monténégro",
      "slug": "montenegro",
      "code": "ME",
      "iso3": "MNE",
      "phone_code": "+382",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/me.svg",
      "created_at": "2025-09-15T06:30:58.000Z"
    },
    {
      "id": 119,
      "name": "Mozambique",
      "slug": "mozambique",
      "code": "MZ",
      "iso3": "MOZ",
      "phone_code": "+258",
      "currency": "MZN",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/mz.svg",
      "created_at": "2025-09-15T06:30:58.000Z"
    },
    {
      "id": 120,
      "name": "Myanmar",
      "slug": "myanmar",
      "code": "MM",
      "iso3": "MMR",
      "phone_code": "+95",
      "currency": "MMK",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/mm.svg",
      "created_at": "2025-09-15T06:30:59.000Z"
    },
    {
      "id": 121,
      "name": "Namibie",
      "slug": "namibie",
      "code": "NA",
      "iso3": "NAM",
      "phone_code": "+264",
      "currency": "NAD",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/na.svg",
      "created_at": "2025-09-15T06:30:59.000Z"
    },
    {
      "id": 122,
      "name": "Nauru",
      "slug": "nauru",
      "code": "NR",
      "iso3": "NRU",
      "phone_code": "+674",
      "currency": "AUD",
      "continent": "Oceania",
      "flag_url": "https://flagcdn.com/nr.svg",
      "created_at": "2025-09-15T06:30:59.000Z"
    },
    {
      "id": 123,
      "name": "Népal",
      "slug": "nepal",
      "code": "NP",
      "iso3": "NPL",
      "phone_code": "+977",
      "currency": "NPR",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/np.svg",
      "created_at": "2025-09-15T06:30:59.000Z"
    },
    {
      "id": 126,
      "name": "Nicaragua",
      "slug": "nicaragua",
      "code": "NI",
      "iso3": "NIC",
      "phone_code": "+505",
      "currency": "NIO",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/ni.svg",
      "created_at": "2025-09-15T06:31:00.000Z"
    },
    {
      "id": 127,
      "name": "Niger",
      "slug": "niger",
      "code": "NE",
      "iso3": "NER",
      "phone_code": "+227",
      "currency": "XOF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/ne.svg",
      "created_at": "2025-09-15T06:31:00.000Z"
    },
    {
      "id": 128,
      "name": "Nigeria",
      "slug": "nigeria",
      "code": "NG",
      "iso3": "NGA",
      "phone_code": "+234",
      "currency": "NGN",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/ng.svg",
      "created_at": "2025-09-15T06:31:00.000Z"
    },
    {
      "id": 129,
      "name": "Norvège",
      "slug": "norvege",
      "code": "NO",
      "iso3": "NOR",
      "phone_code": "+47",
      "currency": "NOK",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/no.svg",
      "created_at": "2025-09-15T06:31:00.000Z"
    },
    {
      "id": 125,
      "name": "Nouvelle-Zélande",
      "slug": "nouvelle-zelande",
      "code": "NZ",
      "iso3": "NZL",
      "phone_code": "+64",
      "currency": "NZD",
      "continent": "Oceania",
      "flag_url": "https://flagcdn.com/nz.svg",
      "created_at": "2025-09-15T06:31:00.000Z"
    },
    {
      "id": 130,
      "name": "Oman",
      "slug": "oman",
      "code": "OM",
      "iso3": "OMN",
      "phone_code": "+968",
      "currency": "OMR",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/om.svg",
      "created_at": "2025-09-15T06:31:01.000Z"
    },
    {
      "id": 181,
      "name": "Ouganda",
      "slug": "ouganda",
      "code": "UG",
      "iso3": "UGA",
      "phone_code": "+256",
      "currency": "UGX",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/ug.svg",
      "created_at": "2025-09-15T06:31:11.000Z"
    },
    {
      "id": 187,
      "name": "Ouzbékistan",
      "slug": "ouzbekistan",
      "code": "UZ",
      "iso3": "UZB",
      "phone_code": "+998",
      "currency": "UZS",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/uz.svg",
      "created_at": "2025-09-15T06:31:12.000Z"
    },
    {
      "id": 131,
      "name": "Pakistan",
      "slug": "pakistan",
      "code": "PK",
      "iso3": "PAK",
      "phone_code": "+92",
      "currency": "PKR",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/pk.svg",
      "created_at": "2025-09-15T06:31:01.000Z"
    },
    {
      "id": 132,
      "name": "Palaos",
      "slug": "palaos",
      "code": "PW",
      "iso3": "PLW",
      "phone_code": "+680",
      "currency": "USD",
      "continent": "Oceania",
      "flag_url": "https://flagcdn.com/pw.svg",
      "created_at": "2025-09-15T06:31:01.000Z"
    },
    {
      "id": 133,
      "name": "Panama",
      "slug": "panama",
      "code": "PA",
      "iso3": "PAN",
      "phone_code": "+507",
      "currency": "PAB",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/pa.svg",
      "created_at": "2025-09-15T06:31:01.000Z"
    },
    {
      "id": 134,
      "name": "Papouasie-Nouvelle-Guinée",
      "slug": "papouasie-nouvelle-guinee",
      "code": "PG",
      "iso3": "PNG",
      "phone_code": "+675",
      "currency": "PGK",
      "continent": "Oceania",
      "flag_url": "https://flagcdn.com/pg.svg",
      "created_at": "2025-09-15T06:31:01.000Z"
    },
    {
      "id": 135,
      "name": "Paraguay",
      "slug": "paraguay",
      "code": "PY",
      "iso3": "PRY",
      "phone_code": "+595",
      "currency": "PYG",
      "continent": "South America",
      "flag_url": "https://flagcdn.com/py.svg",
      "created_at": "2025-09-15T06:31:02.000Z"
    },
    {
      "id": 124,
      "name": "Pays-Bas",
      "slug": "pays-bas",
      "code": "NL",
      "iso3": "NLD",
      "phone_code": "+31",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/nl.svg",
      "created_at": "2025-09-15T06:30:59.000Z"
    },
    {
      "id": 136,
      "name": "Pérou",
      "slug": "perou",
      "code": "PE",
      "iso3": "PER",
      "phone_code": "+51",
      "currency": "PEN",
      "continent": "South America",
      "flag_url": "https://flagcdn.com/pe.svg",
      "created_at": "2025-09-15T06:31:02.000Z"
    },
    {
      "id": 137,
      "name": "Philippines",
      "slug": "philippines",
      "code": "PH",
      "iso3": "PHL",
      "phone_code": "+63",
      "currency": "PHP",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/ph.svg",
      "created_at": "2025-09-15T06:31:02.000Z"
    },
    {
      "id": 138,
      "name": "Pologne",
      "slug": "pologne",
      "code": "PL",
      "iso3": "POL",
      "phone_code": "+48",
      "currency": "PLN",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/pl.svg",
      "created_at": "2025-09-15T06:31:02.000Z"
    },
    {
      "id": 139,
      "name": "Portugal",
      "slug": "portugal",
      "code": "PT",
      "iso3": "PRT",
      "phone_code": "+351",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/pt.svg",
      "created_at": "2025-09-15T06:31:03.000Z"
    },
    {
      "id": 140,
      "name": "Qatar",
      "slug": "qatar",
      "code": "QA",
      "iso3": "QAT",
      "phone_code": "+974",
      "currency": "QAR",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/qa.svg",
      "created_at": "2025-09-15T06:31:03.000Z"
    },
    {
      "id": 33,
      "name": "République centrafricaine",
      "slug": "republique-centrafricaine",
      "code": "CF",
      "iso3": "CAF",
      "phone_code": "+236",
      "currency": "XAF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/cf.svg",
      "created_at": "2025-09-15T06:30:40.000Z"
    },
    {
      "id": 49,
      "name": "République dominicaine",
      "slug": "republique-dominicaine",
      "code": "DO",
      "iso3": "DOM",
      "phone_code": "+1809",
      "currency": "DOP",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/do.svg",
      "created_at": "2025-09-15T06:30:43.000Z"
    },
    {
      "id": 45,
      "name": "République tchèque",
      "slug": "republique-tcheque",
      "code": "CZ",
      "iso3": "CZE",
      "phone_code": "+420",
      "currency": "CZK",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/cz.svg",
      "created_at": "2025-09-15T06:30:42.000Z"
    },
    {
      "id": 141,
      "name": "Roumanie",
      "slug": "roumanie",
      "code": "RO",
      "iso3": "ROU",
      "phone_code": "+40",
      "currency": "RON",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/ro.svg",
      "created_at": "2025-09-15T06:31:03.000Z"
    },
    {
      "id": 184,
      "name": "Royaume-Uni",
      "slug": "royaume-uni",
      "code": "GB",
      "iso3": "GBR",
      "phone_code": "+44",
      "currency": "GBP",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/gb.svg",
      "created_at": "2025-09-15T06:31:12.000Z"
    },
    {
      "id": 142,
      "name": "Russie",
      "slug": "russie",
      "code": "RU",
      "iso3": "RUS",
      "phone_code": "+7",
      "currency": "RUB",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/ru.svg",
      "created_at": "2025-09-15T06:31:03.000Z"
    },
    {
      "id": 143,
      "name": "Rwanda",
      "slug": "rwanda",
      "code": "RW",
      "iso3": "RWA",
      "phone_code": "+250",
      "currency": "RWF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/rw.svg",
      "created_at": "2025-09-15T06:31:03.000Z"
    },
    {
      "id": 144,
      "name": "Saint-Christophe-et-Niévès",
      "slug": "saint-christophe-et-nieves",
      "code": "KN",
      "iso3": "KNA",
      "phone_code": "+1869",
      "currency": "XCD",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/kn.svg",
      "created_at": "2025-09-15T06:31:03.000Z"
    },
    {
      "id": 148,
      "name": "Saint-Marin",
      "slug": "saint-marin",
      "code": "SM",
      "iso3": "SMR",
      "phone_code": "+378",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/sm.svg",
      "created_at": "2025-09-15T06:31:04.000Z"
    },
    {
      "id": 146,
      "name": "Saint-Vincent-et-les-Grenadines",
      "slug": "saint-vincent-et-les-grenadines",
      "code": "VC",
      "iso3": "VCT",
      "phone_code": "+1784",
      "currency": "XCD",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/vc.svg",
      "created_at": "2025-09-15T06:31:04.000Z"
    },
    {
      "id": 145,
      "name": "Sainte-Lucie",
      "slug": "sainte-lucie",
      "code": "LC",
      "iso3": "LCA",
      "phone_code": "+1758",
      "currency": "XCD",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/lc.svg",
      "created_at": "2025-09-15T06:31:04.000Z"
    },
    {
      "id": 147,
      "name": "Samoa",
      "slug": "samoa",
      "code": "WS",
      "iso3": "WSM",
      "phone_code": "+685",
      "currency": "WST",
      "continent": "Oceania",
      "flag_url": "https://flagcdn.com/ws.svg",
      "created_at": "2025-09-15T06:31:04.000Z"
    },
    {
      "id": 149,
      "name": "São Tomé-et-Principe",
      "slug": "sao-tome-et-principe",
      "code": "ST",
      "iso3": "STP",
      "phone_code": "+239",
      "currency": "STN",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/st.svg",
      "created_at": "2025-09-15T06:31:04.000Z"
    },
    {
      "id": 151,
      "name": "Sénégal",
      "slug": "senegal",
      "code": "SN",
      "iso3": "SEN",
      "phone_code": "+221",
      "currency": "XOF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/sn.svg",
      "created_at": "2025-09-15T06:31:05.000Z"
    },
    {
      "id": 152,
      "name": "Serbie",
      "slug": "serbie",
      "code": "RS",
      "iso3": "SRB",
      "phone_code": "+381",
      "currency": "RSD",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/rs.svg",
      "created_at": "2025-09-15T06:31:05.000Z"
    },
    {
      "id": 153,
      "name": "Seychelles",
      "slug": "seychelles",
      "code": "SC",
      "iso3": "SYC",
      "phone_code": "+248",
      "currency": "SCR",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/sc.svg",
      "created_at": "2025-09-15T06:31:05.000Z"
    },
    {
      "id": 154,
      "name": "Sierra Leone",
      "slug": "sierra-leone",
      "code": "SL",
      "iso3": "SLE",
      "phone_code": "+232",
      "currency": "SLL",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/sl.svg",
      "created_at": "2025-09-15T06:31:05.000Z"
    },
    {
      "id": 155,
      "name": "Singapour",
      "slug": "singapour",
      "code": "SG",
      "iso3": "SGP",
      "phone_code": "+65",
      "currency": "SGD",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/sg.svg",
      "created_at": "2025-09-15T06:31:05.000Z"
    },
    {
      "id": 156,
      "name": "Slovaquie",
      "slug": "slovaquie",
      "code": "SK",
      "iso3": "SVK",
      "phone_code": "+421",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/sk.svg",
      "created_at": "2025-09-15T06:31:05.000Z"
    },
    {
      "id": 157,
      "name": "Slovénie",
      "slug": "slovenie",
      "code": "SI",
      "iso3": "SVN",
      "phone_code": "+386",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/si.svg",
      "created_at": "2025-09-15T06:31:06.000Z"
    },
    {
      "id": 159,
      "name": "Somalie",
      "slug": "somalie",
      "code": "SO",
      "iso3": "SOM",
      "phone_code": "+252",
      "currency": "SOS",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/so.svg",
      "created_at": "2025-09-15T06:31:06.000Z"
    },
    {
      "id": 164,
      "name": "Soudan",
      "slug": "soudan",
      "code": "SD",
      "iso3": "SDN",
      "phone_code": "+249",
      "currency": "SDG",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/sd.svg",
      "created_at": "2025-09-15T06:31:07.000Z"
    },
    {
      "id": 161,
      "name": "Soudan du Sud",
      "slug": "soudan-du-sud",
      "code": "SS",
      "iso3": "SSD",
      "phone_code": "+211",
      "currency": "SSP",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/ss.svg",
      "created_at": "2025-09-15T06:31:06.000Z"
    },
    {
      "id": 163,
      "name": "Sri Lanka",
      "slug": "sri-lanka",
      "code": "LK",
      "iso3": "LKA",
      "phone_code": "+94",
      "currency": "LKR",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/lk.svg",
      "created_at": "2025-09-15T06:31:07.000Z"
    },
    {
      "id": 167,
      "name": "Suède",
      "slug": "suede",
      "code": "SE",
      "iso3": "SWE",
      "phone_code": "+46",
      "currency": "SEK",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/se.svg",
      "created_at": "2025-09-15T06:31:08.000Z"
    },
    {
      "id": 168,
      "name": "Suisse",
      "slug": "suisse",
      "code": "CH",
      "iso3": "CHE",
      "phone_code": "+41",
      "currency": "CHF",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/ch.svg",
      "created_at": "2025-09-15T06:31:08.000Z"
    },
    {
      "id": 165,
      "name": "Suriname",
      "slug": "suriname",
      "code": "SR",
      "iso3": "SUR",
      "phone_code": "+597",
      "currency": "SRD",
      "continent": "South America",
      "flag_url": "https://flagcdn.com/sr.svg",
      "created_at": "2025-09-15T06:31:07.000Z"
    },
    {
      "id": 169,
      "name": "Syrie",
      "slug": "syrie",
      "code": "SY",
      "iso3": "SYR",
      "phone_code": "+963",
      "currency": "SYP",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/sy.svg",
      "created_at": "2025-09-15T06:31:08.000Z"
    },
    {
      "id": 170,
      "name": "Tadjikistan",
      "slug": "tadjikistan",
      "code": "TJ",
      "iso3": "TJK",
      "phone_code": "+992",
      "currency": "TJS",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/tj.svg",
      "created_at": "2025-09-15T06:31:08.000Z"
    },
    {
      "id": 171,
      "name": "Tanzanie",
      "slug": "tanzanie",
      "code": "TZ",
      "iso3": "TZA",
      "phone_code": "+255",
      "currency": "TZS",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/tz.svg",
      "created_at": "2025-09-15T06:31:09.000Z"
    },
    {
      "id": 34,
      "name": "Tchad",
      "slug": "tchad",
      "code": "TD",
      "iso3": "TCD",
      "phone_code": "+235",
      "currency": "XAF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/td.svg",
      "created_at": "2025-09-15T06:30:40.000Z"
    },
    {
      "id": 172,
      "name": "Thaïlande",
      "slug": "thailande",
      "code": "TH",
      "iso3": "THA",
      "phone_code": "+66",
      "currency": "THB",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/th.svg",
      "created_at": "2025-09-15T06:31:09.000Z"
    },
    {
      "id": 173,
      "name": "Timor oriental",
      "slug": "timor-oriental",
      "code": "TL",
      "iso3": "TLS",
      "phone_code": "+670",
      "currency": "USD",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/tl.svg",
      "created_at": "2025-09-15T06:31:09.000Z"
    },
    {
      "id": 174,
      "name": "Togo",
      "slug": "togo",
      "code": "TG",
      "iso3": "TGO",
      "phone_code": "+228",
      "currency": "XOF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/tg.svg",
      "created_at": "2025-09-15T06:31:10.000Z"
    },
    {
      "id": 175,
      "name": "Tonga",
      "slug": "tonga",
      "code": "TO",
      "iso3": "TON",
      "phone_code": "+676",
      "currency": "TOP",
      "continent": "Oceania",
      "flag_url": "https://flagcdn.com/to.svg",
      "created_at": "2025-09-15T06:31:10.000Z"
    },
    {
      "id": 176,
      "name": "Trinité-et-Tobago",
      "slug": "trinite-et-tobago",
      "code": "TT",
      "iso3": "TTO",
      "phone_code": "+1868",
      "currency": "TTD",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/tt.svg",
      "created_at": "2025-09-15T06:31:10.000Z"
    },
    {
      "id": 177,
      "name": "Tunisie",
      "slug": "tunisie",
      "code": "TN",
      "iso3": "TUN",
      "phone_code": "+216",
      "currency": "TND",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/tn.svg",
      "created_at": "2025-09-15T06:31:10.000Z"
    },
    {
      "id": 179,
      "name": "Turkménistan",
      "slug": "turkmenistan",
      "code": "TM",
      "iso3": "TKM",
      "phone_code": "+993",
      "currency": "TMT",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/tm.svg",
      "created_at": "2025-09-15T06:31:11.000Z"
    },
    {
      "id": 178,
      "name": "Turquie",
      "slug": "turquie",
      "code": "TR",
      "iso3": "TUR",
      "phone_code": "+90",
      "currency": "TRY",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/tr.svg",
      "created_at": "2025-09-15T06:31:10.000Z"
    },
    {
      "id": 180,
      "name": "Tuvalu",
      "slug": "tuvalu",
      "code": "TV",
      "iso3": "TUV",
      "phone_code": "+688",
      "currency": "AUD",
      "continent": "Oceania",
      "flag_url": "https://flagcdn.com/tv.svg",
      "created_at": "2025-09-15T06:31:11.000Z"
    },
    {
      "id": 182,
      "name": "Ukraine",
      "slug": "ukraine",
      "code": "UA",
      "iso3": "UKR",
      "phone_code": "+380",
      "currency": "UAH",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/ua.svg",
      "created_at": "2025-09-15T06:31:11.000Z"
    },
    {
      "id": 186,
      "name": "Uruguay",
      "slug": "uruguay",
      "code": "UY",
      "iso3": "URY",
      "phone_code": "+598",
      "currency": "UYU",
      "continent": "South America",
      "flag_url": "https://flagcdn.com/uy.svg",
      "created_at": "2025-09-15T06:31:12.000Z"
    },
    {
      "id": 188,
      "name": "Vanuatu",
      "slug": "vanuatu",
      "code": "VU",
      "iso3": "VUT",
      "phone_code": "+678",
      "currency": "VUV",
      "continent": "Oceania",
      "flag_url": "https://flagcdn.com/vu.svg",
      "created_at": "2025-09-15T06:31:13.000Z"
    },
    {
      "id": 189,
      "name": "Vatican",
      "slug": "vatican",
      "code": "VA",
      "iso3": "VAT",
      "phone_code": "+379",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/va.svg",
      "created_at": "2025-09-15T06:31:13.000Z"
    },
    {
      "id": 190,
      "name": "Venezuela",
      "slug": "venezuela",
      "code": "VE",
      "iso3": "VEN",
      "phone_code": "+58",
      "currency": "VES",
      "continent": "South America",
      "flag_url": "https://flagcdn.com/ve.svg",
      "created_at": "2025-09-15T06:31:14.000Z"
    },
    {
      "id": 191,
      "name": "Viêt Nam",
      "slug": "viet-nam",
      "code": "VN",
      "iso3": "VNM",
      "phone_code": "+84",
      "currency": "VND",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/vn.svg",
      "created_at": "2025-09-15T06:31:14.000Z"
    },
    {
      "id": 192,
      "name": "Yémen",
      "slug": "yemen",
      "code": "YE",
      "iso3": "YEM",
      "phone_code": "+967",
      "currency": "YER",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/ye.svg",
      "created_at": "2025-09-15T06:31:15.000Z"
    },
    {
      "id": 193,
      "name": "Zambie",
      "slug": "zambie",
      "code": "ZM",
      "iso3": "ZMB",
      "phone_code": "+260",
      "currency": "ZMW",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/zm.svg",
      "created_at": "2025-09-15T06:31:15.000Z"
    },
    {
      "id": 194,
      "name": "Zimbabwe",
      "slug": "zimbabwe",
      "code": "ZW",
      "iso3": "ZWE",
      "phone_code": "+263",
      "currency": "ZWL",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/zw.svg",
      "created_at": "2025-09-15T06:31:16.000Z"
    },

    {
      "id": 1,
      "name": "Afghanistan",
      "slug": "afghanistan",
      "code": "AF",
      "iso3": "AFG",
      "phone_code": "+93",
      "currency": "AFN",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/af.svg",
      "created_at": "2025-09-15T06:30:32.000Z"
    },
    {
      "id": 160,
      "name": "Afrique du Sud",
      "slug": "afrique-du-sud",
      "code": "ZA",
      "iso3": "ZAF",
      "phone_code": "+27",
      "currency": "ZAR",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/za.svg",
      "created_at": "2025-09-15T06:31:06.000Z"
    },
    {
      "id": 2,
      "name": "Albanie",
      "slug": "albanie",
      "code": "AL",
      "iso3": "ALB",
      "phone_code": "+355",
      "currency": "ALL",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/al.svg",
      "created_at": "2025-09-15T06:30:32.000Z"
    },
    {
      "id": 3,
      "name": "Algérie",
      "slug": "algerie",
      "code": "DZ",
      "iso3": "DZA",
      "phone_code": "+213",
      "currency": "DZD",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/dz.svg",
      "created_at": "2025-09-15T06:30:33.000Z"
    },
    {
      "id": 64,
      "name": "Allemagne",
      "slug": "allemagne",
      "code": "DE",
      "iso3": "DEU",
      "phone_code": "+49",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/de.svg",
      "created_at": "2025-09-15T06:30:45.000Z"
    },
    {
      "id": 4,
      "name": "Andorre",
      "slug": "andorre",
      "code": "AD",
      "iso3": "AND",
      "phone_code": "+376",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/ad.svg",
      "created_at": "2025-09-15T06:30:33.000Z"
    },
    {
      "id": 5,
      "name": "Angola",
      "slug": "angola",
      "code": "AO",
      "iso3": "AGO",
      "phone_code": "+244",
      "currency": "AOA",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/ao.svg",
      "created_at": "2025-09-15T06:30:33.000Z"
    },
    {
      "id": 6,
      "name": "Antigua-et-Barbuda",
      "slug": "antigua-et-barbuda",
      "code": "AG",
      "iso3": "ATG",
      "phone_code": "+1268",
      "currency": "XCD",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/ag.svg",
      "created_at": "2025-09-15T06:30:33.000Z"
    },
    {
      "id": 150,
      "name": "Arabie saoudite",
      "slug": "arabie-saoudite",
      "code": "SA",
      "iso3": "SAU",
      "phone_code": "+966",
      "currency": "SAR",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/sa.svg",
      "created_at": "2025-09-15T06:31:04.000Z"
    },
    {
      "id": 7,
      "name": "Argentine",
      "slug": "argentine",
      "code": "AR",
      "iso3": "ARG",
      "phone_code": "+54",
      "currency": "ARS",
      "continent": "South America",
      "flag_url": "https://flagcdn.com/ar.svg",
      "created_at": "2025-09-15T06:30:33.000Z"
    },
    {
      "id": 8,
      "name": "Arménie",
      "slug": "armenie",
      "code": "AM",
      "iso3": "ARM",
      "phone_code": "+374",
      "currency": "AMD",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/am.svg",
      "created_at": "2025-09-15T06:30:34.000Z"
    },
    {
      "id": 9,
      "name": "Australie",
      "slug": "australie",
      "code": "AU",
      "iso3": "AUS",
      "phone_code": "+61",
      "currency": "AUD",
      "continent": "Oceania",
      "flag_url": "https://flagcdn.com/au.svg",
      "created_at": "2025-09-15T06:30:34.000Z"
    },
    {
      "id": 10,
      "name": "Autriche",
      "slug": "autriche",
      "code": "AT",
      "iso3": "AUT",
      "phone_code": "+43",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/at.svg",
      "created_at": "2025-09-15T06:30:34.000Z"
    },
    {
      "id": 11,
      "name": "Azerbaïdjan",
      "slug": "azerbaidjan",
      "code": "AZ",
      "iso3": "AZE",
      "phone_code": "+994",
      "currency": "AZN",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/az.svg",
      "created_at": "2025-09-15T06:30:34.000Z"
    },
    {
      "id": 12,
      "name": "Bahamas",
      "slug": "bahamas",
      "code": "BS",
      "iso3": "BHS",
      "phone_code": "+1242",
      "currency": "BSD",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/bs.svg",
      "created_at": "2025-09-15T06:30:35.000Z"
    },
    {
      "id": 13,
      "name": "Bahreïn",
      "slug": "bahrein",
      "code": "BH",
      "iso3": "BHR",
      "phone_code": "+973",
      "currency": "BHD",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/bh.svg",
      "created_at": "2025-09-15T06:30:36.000Z"
    },
    {
      "id": 14,
      "name": "Bangladesh",
      "slug": "bangladesh",
      "code": "BD",
      "iso3": "BGD",
      "phone_code": "+880",
      "currency": "BDT",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/bd.svg",
      "created_at": "2025-09-15T06:30:36.000Z"
    },
    {
      "id": 15,
      "name": "Barbade",
      "slug": "barbade",
      "code": "BB",
      "iso3": "BRB",
      "phone_code": "+1246",
      "currency": "BBD",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/bb.svg",
      "created_at": "2025-09-15T06:30:36.000Z"
    },
    {
      "id": 17,
      "name": "Belgique",
      "slug": "belgique",
      "code": "BE",
      "iso3": "BEL",
      "phone_code": "+32",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/be.svg",
      "created_at": "2025-09-15T06:30:36.000Z"
    },
    {
      "id": 18,
      "name": "Belize",
      "slug": "belize",
      "code": "BZ",
      "iso3": "BLZ",
      "phone_code": "+501",
      "currency": "BZD",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/bz.svg",
      "created_at": "2025-09-15T06:30:36.000Z"
    },
    {
      "id": 19,
      "name": "Bénin",
      "slug": "benin",
      "code": "BJ",
      "iso3": "BEN",
      "phone_code": "+229",
      "currency": "XOF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/bj.svg",
      "created_at": "2025-09-15T06:30:37.000Z"
    },
    {
      "id": 20,
      "name": "Bhoutan",
      "slug": "bhoutan",
      "code": "BT",
      "iso3": "BTN",
      "phone_code": "+975",
      "currency": "BTN",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/bt.svg",
      "created_at": "2025-09-15T06:30:37.000Z"
    },
    {
      "id": 16,
      "name": "Biélorussie",
      "slug": "bielorussie",
      "code": "BY",
      "iso3": "BLR",
      "phone_code": "+375",
      "currency": "BYN",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/by.svg",
      "created_at": "2025-09-15T06:30:36.000Z"
    },
    {
      "id": 21,
      "name": "Bolivie",
      "slug": "bolivie",
      "code": "BO",
      "iso3": "BOL",
      "phone_code": "+591",
      "currency": "BOB",
      "continent": "South America",
      "flag_url": "https://flagcdn.com/bo.svg",
      "created_at": "2025-09-15T06:30:38.000Z"
    },
    {
      "id": 22,
      "name": "Bosnie-Herzégovine",
      "slug": "bosnie-herzegovine",
      "code": "BA",
      "iso3": "BIH",
      "phone_code": "+387",
      "currency": "BAM",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/ba.svg",
      "created_at": "2025-09-15T06:30:38.000Z"
    },
    {
      "id": 23,
      "name": "Botswana",
      "slug": "botswana",
      "code": "BW",
      "iso3": "BWA",
      "phone_code": "+267",
      "currency": "BWP",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/bw.svg",
      "created_at": "2025-09-15T06:30:38.000Z"
    },
    {
      "id": 24,
      "name": "Brésil",
      "slug": "bresil",
      "code": "BR",
      "iso3": "BRA",
      "phone_code": "+55",
      "currency": "BRL",
      "continent": "South America",
      "flag_url": "https://flagcdn.com/br.svg",
      "created_at": "2025-09-15T06:30:38.000Z"
    },
    {
      "id": 25,
      "name": "Brunei",
      "slug": "brunei",
      "code": "BN",
      "iso3": "BRN",
      "phone_code": "+673",
      "currency": "BND",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/bn.svg",
      "created_at": "2025-09-15T06:30:39.000Z"
    },
    {
      "id": 26,
      "name": "Bulgarie",
      "slug": "bulgarie",
      "code": "BG",
      "iso3": "BGR",
      "phone_code": "+359",
      "currency": "BGN",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/bg.svg",
      "created_at": "2025-09-15T06:30:39.000Z"
    },
    {
      "id": 27,
      "name": "Burkina Faso",
      "slug": "burkina-faso",
      "code": "BF",
      "iso3": "BFA",
      "phone_code": "+226",
      "currency": "XOF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/bf.svg",
      "created_at": "2025-09-15T06:30:39.000Z"
    },
    {
      "id": 28,
      "name": "Burundi",
      "slug": "burundi",
      "code": "BI",
      "iso3": "BDI",
      "phone_code": "+257",
      "currency": "BIF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/bi.svg",
      "created_at": "2025-09-15T06:30:39.000Z"
    },
    {
      "id": 29,
      "name": "Cabo Verde",
      "slug": "cabo-verde",
      "code": "CV",
      "iso3": "CPV",
      "phone_code": "+238",
      "currency": "CVE",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/cv.svg",
      "created_at": "2025-09-15T06:30:39.000Z"
    },
    {
      "id": 30,
      "name": "Cambodge",
      "slug": "cambodge",
      "code": "KH",
      "iso3": "KHM",
      "phone_code": "+855",
      "currency": "KHR",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/kh.svg",
      "created_at": "2025-09-15T06:30:39.000Z"
    },
    {
      "id": 31,
      "name": "Cameroun",
      "slug": "cameroun",
      "code": "CM",
      "iso3": "CMR",
      "phone_code": "+237",
      "currency": "XAF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/cm.svg",
      "created_at": "2025-09-15T06:30:40.000Z"
    },
    {
      "id": 32,
      "name": "Canada",
      "slug": "canada",
      "code": "CA",
      "iso3": "CAN",
      "phone_code": "+1",
      "currency": "CAD",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/ca.svg",
      "created_at": "2025-09-15T06:30:40.000Z"
    },
    {
      "id": 35,
      "name": "Chili",
      "slug": "chili",
      "code": "CL",
      "iso3": "CHL",
      "phone_code": "+56",
      "currency": "CLP",
      "continent": "South America",
      "flag_url": "https://flagcdn.com/cl.svg",
      "created_at": "2025-09-15T06:30:40.000Z"
    },
    {
      "id": 36,
      "name": "Chine",
      "slug": "chine",
      "code": "CN",
      "iso3": "CHN",
      "phone_code": "+86",
      "currency": "CNY",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/cn.svg",
      "created_at": "2025-09-15T06:30:40.000Z"
    },
    {
      "id": 44,
      "name": "Chypre",
      "slug": "chypre",
      "code": "CY",
      "iso3": "CYP",
      "phone_code": "+357",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/cy.svg",
      "created_at": "2025-09-15T06:30:42.000Z"
    },
    {
      "id": 37,
      "name": "Colombie",
      "slug": "colombie",
      "code": "CO",
      "iso3": "COL",
      "phone_code": "+57",
      "currency": "COP",
      "continent": "South America",
      "flag_url": "https://flagcdn.com/co.svg",
      "created_at": "2025-09-15T06:30:41.000Z"
    },
    {
      "id": 38,
      "name": "Comores",
      "slug": "comores",
      "code": "KM",
      "iso3": "COM",
      "phone_code": "+269",
      "currency": "KMF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/km.svg",
      "created_at": "2025-09-15T06:30:41.000Z"
    },
    {
      "id": 39,
      "name": "Congo (Brazzaville)",
      "slug": "congo-brazzaville",
      "code": "CG",
      "iso3": "COG",
      "phone_code": "+242",
      "currency": "XAF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/cg.svg",
      "created_at": "2025-09-15T06:30:41.000Z"
    },
    {
      "id": 40,
      "name": "Congo (Kinshasa)",
      "slug": "congo-kinshasa",
      "code": "CD",
      "iso3": "COD",
      "phone_code": "+243",
      "currency": "CDF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/cd.svg",
      "created_at": "2025-09-15T06:30:41.000Z"
    },
    {
      "id": 89,
      "name": "Corée du Nord",
      "slug": "coree-du-nord",
      "code": "KP",
      "iso3": "PRK",
      "phone_code": "+850",
      "currency": "KPW",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/kp.svg",
      "created_at": "2025-09-15T06:30:50.000Z"
    },
    {
      "id": 90,
      "name": "Corée du Sud",
      "slug": "coree-du-sud",
      "code": "KR",
      "iso3": "KOR",
      "phone_code": "+82",
      "currency": "KRW",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/kr.svg",
      "created_at": "2025-09-15T06:30:50.000Z"
    },
    {
      "id": 41,
      "name": "Costa Rica",
      "slug": "costa-rica",
      "code": "CR",
      "iso3": "CRI",
      "phone_code": "+506",
      "currency": "CRC",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/cr.svg",
      "created_at": "2025-09-15T06:30:41.000Z"
    },
    {
      "id": 42,
      "name": "Croatie",
      "slug": "croatie",
      "code": "HR",
      "iso3": "HRV",
      "phone_code": "+385",
      "currency": "HRK",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/hr.svg",
      "created_at": "2025-09-15T06:30:42.000Z"
    },
    {
      "id": 43,
      "name": "Cuba",
      "slug": "cuba",
      "code": "CU",
      "iso3": "CUB",
      "phone_code": "+53",
      "currency": "CUP",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/cu.svg",
      "created_at": "2025-09-15T06:30:42.000Z"
    },
    {
      "id": 46,
      "name": "Danemark",
      "slug": "danemark",
      "code": "DK",
      "iso3": "DNK",
      "phone_code": "+45",
      "currency": "DKK",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/dk.svg",
      "created_at": "2025-09-15T06:30:42.000Z"
    },
    {
      "id": 47,
      "name": "Djibouti",
      "slug": "djibouti",
      "code": "DJ",
      "iso3": "DJI",
      "phone_code": "+253",
      "currency": "DJF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/dj.svg",
      "created_at": "2025-09-15T06:30:42.000Z"
    },
    {
      "id": 48,
      "name": "Dominique",
      "slug": "dominique",
      "code": "DM",
      "iso3": "DMA",
      "phone_code": "+1767",
      "currency": "XCD",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/dm.svg",
      "created_at": "2025-09-15T06:30:43.000Z"
    },
    {
      "id": 51,
      "name": "Égypte",
      "slug": "egypte",
      "code": "EG",
      "iso3": "EGY",
      "phone_code": "+20",
      "currency": "EGP",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/eg.svg",
      "created_at": "2025-09-15T06:30:43.000Z"
    },
    {
      "id": 52,
      "name": "El Salvador",
      "slug": "el-salvador",
      "code": "SV",
      "iso3": "SLV",
      "phone_code": "+503",
      "currency": "SVC",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/sv.svg",
      "created_at": "2025-09-15T06:30:43.000Z"
    },
    {
      "id": 183,
      "name": "Émirats arabes unis",
      "slug": "emirats-arabes-unis",
      "code": "AE",
      "iso3": "ARE",
      "phone_code": "+971",
      "currency": "AED",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/ae.svg",
      "created_at": "2025-09-15T06:31:11.000Z"
    },
    {
      "id": 50,
      "name": "Équateur",
      "slug": "equateur",
      "code": "EC",
      "iso3": "ECU",
      "phone_code": "+593",
      "currency": "USD",
      "continent": "South America",
      "flag_url": "https://flagcdn.com/ec.svg",
      "created_at": "2025-09-15T06:30:43.000Z"
    },
    {
      "id": 54,
      "name": "Érythrée",
      "slug": "erythree",
      "code": "ER",
      "iso3": "ERI",
      "phone_code": "+291",
      "currency": "ERN",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/er.svg",
      "created_at": "2025-09-15T06:30:44.000Z"
    },
    {
      "id": 162,
      "name": "Espagne",
      "slug": "espagne",
      "code": "ES",
      "iso3": "ESP",
      "phone_code": "+34",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/es.svg",
      "created_at": "2025-09-15T06:31:07.000Z"
    },
    {
      "id": 55,
      "name": "Estonie",
      "slug": "estonie",
      "code": "EE",
      "iso3": "EST",
      "phone_code": "+372",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/ee.svg",
      "created_at": "2025-09-15T06:30:44.000Z"
    },
    {
      "id": 56,
      "name": "Eswatini",
      "slug": "eswatini",
      "code": "SZ",
      "iso3": "SWZ",
      "phone_code": "+268",
      "currency": "SZL",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/sz.svg",
      "created_at": "2025-09-15T06:30:44.000Z"
    },
    {
      "id": 185,
      "name": "États-Unis",
      "slug": "etats-unis",
      "code": "US",
      "iso3": "USA",
      "phone_code": "+1",
      "currency": "USD",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/us.svg",
      "created_at": "2025-09-15T06:31:12.000Z"
    },
    {
      "id": 57,
      "name": "Éthiopie",
      "slug": "ethiopie",
      "code": "ET",
      "iso3": "ETH",
      "phone_code": "+251",
      "currency": "ETB",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/et.svg",
      "created_at": "2025-09-15T06:30:44.000Z"
    },
    {
      "id": 58,
      "name": "Fidji",
      "slug": "fidji",
      "code": "FJ",
      "iso3": "FJI",
      "phone_code": "+679",
      "currency": "FJD",
      "continent": "Oceania",
      "flag_url": "https://flagcdn.com/fj.svg",
      "created_at": "2025-09-15T06:30:44.000Z"
    },
    {
      "id": 59,
      "name": "Finlande",
      "slug": "finlande",
      "code": "FI",
      "iso3": "FIN",
      "phone_code": "+358",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/fi.svg",
      "created_at": "2025-09-15T06:30:45.000Z"
    },
    {
      "id": 60,
      "name": "France",
      "slug": "france",
      "code": "FR",
      "iso3": "FRA",
      "phone_code": "+33",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/fr.svg",
      "created_at": "2025-09-15T06:30:45.000Z"
    },
    {
      "id": 61,
      "name": "Gabon",
      "slug": "gabon",
      "code": "GA",
      "iso3": "GAB",
      "phone_code": "+241",
      "currency": "XAF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/ga.svg",
      "created_at": "2025-09-15T06:30:45.000Z"
    },
    {
      "id": 62,
      "name": "Gambie",
      "slug": "gambie",
      "code": "GM",
      "iso3": "GMB",
      "phone_code": "+220",
      "currency": "GMD",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/gm.svg",
      "created_at": "2025-09-15T06:30:45.000Z"
    },
    {
      "id": 63,
      "name": "Géorgie",
      "slug": "georgie",
      "code": "GE",
      "iso3": "GEO",
      "phone_code": "+995",
      "currency": "GEL",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/ge.svg",
      "created_at": "2025-09-15T06:30:45.000Z"
    },
    {
      "id": 65,
      "name": "Ghana",
      "slug": "ghana",
      "code": "GH",
      "iso3": "GHA",
      "phone_code": "+233",
      "currency": "GHS",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/gh.svg",
      "created_at": "2025-09-15T06:30:46.000Z"
    },
    {
      "id": 66,
      "name": "Grèce",
      "slug": "grece",
      "code": "GR",
      "iso3": "GRC",
      "phone_code": "+30",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/gr.svg",
      "created_at": "2025-09-15T06:30:46.000Z"
    },
    {
      "id": 67,
      "name": "Grenade",
      "slug": "grenade",
      "code": "GD",
      "iso3": "GRD",
      "phone_code": "+1473",
      "currency": "XCD",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/gd.svg",
      "created_at": "2025-09-15T06:30:46.000Z"
    },
    {
      "id": 68,
      "name": "Guatemala",
      "slug": "guatemala",
      "code": "GT",
      "iso3": "GTM",
      "phone_code": "+502",
      "currency": "GTQ",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/gt.svg",
      "created_at": "2025-09-15T06:30:46.000Z"
    },
    {
      "id": 69,
      "name": "Guinée",
      "slug": "guinee",
      "code": "GN",
      "iso3": "GIN",
      "phone_code": "+224",
      "currency": "GNF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/gn.svg",
      "created_at": "2025-09-15T06:30:46.000Z"
    },
    {
      "id": 53,
      "name": "Guinée équatoriale",
      "slug": "guinee-equatoriale",
      "code": "GQ",
      "iso3": "GNQ",
      "phone_code": "+240",
      "currency": "XAF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/gq.svg",
      "created_at": "2025-09-15T06:30:43.000Z"
    },
    {
      "id": 70,
      "name": "Guinée-Bissau",
      "slug": "guinee-bissau",
      "code": "GW",
      "iso3": "GNB",
      "phone_code": "+245",
      "currency": "XOF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/gw.svg",
      "created_at": "2025-09-15T06:30:47.000Z"
    },
    {
      "id": 71,
      "name": "Guyana",
      "slug": "guyana",
      "code": "GY",
      "iso3": "GUY",
      "phone_code": "+592",
      "currency": "GYD",
      "continent": "South America",
      "flag_url": "https://flagcdn.com/gy.svg",
      "created_at": "2025-09-15T06:30:47.000Z"
    },
    {
      "id": 72,
      "name": "Haïti",
      "slug": "haiti",
      "code": "HT",
      "iso3": "HTI",
      "phone_code": "+509",
      "currency": "HTG",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/ht.svg",
      "created_at": "2025-09-15T06:30:47.000Z"
    },
    {
      "id": 73,
      "name": "Honduras",
      "slug": "honduras",
      "code": "HN",
      "iso3": "HND",
      "phone_code": "+504",
      "currency": "HNL",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/hn.svg",
      "created_at": "2025-09-15T06:30:47.000Z"
    },
    {
      "id": 74,
      "name": "Hongrie",
      "slug": "hongrie",
      "code": "HU",
      "iso3": "HUN",
      "phone_code": "+36",
      "currency": "HUF",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/hu.svg",
      "created_at": "2025-09-15T06:30:47.000Z"
    },
    {
      "id": 109,
      "name": "Îles Marshall",
      "slug": "iles-marshall",
      "code": "MH",
      "iso3": "MHL",
      "phone_code": "+692",
      "currency": "USD",
      "continent": "Oceania",
      "flag_url": "https://flagcdn.com/mh.svg",
      "created_at": "2025-09-15T06:30:55.000Z"
    },
    {
      "id": 158,
      "name": "Îles Salomon",
      "slug": "iles-salomon",
      "code": "SB",
      "iso3": "SLB",
      "phone_code": "+677",
      "currency": "SBD",
      "continent": "Oceania",
      "flag_url": "https://flagcdn.com/sb.svg",
      "created_at": "2025-09-15T06:31:06.000Z"
    },
    {
      "id": 76,
      "name": "Inde",
      "slug": "inde",
      "code": "IN",
      "iso3": "IND",
      "phone_code": "+91",
      "currency": "INR",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/in.svg",
      "created_at": "2025-09-15T06:30:48.000Z"
    },
    {
      "id": 77,
      "name": "Indonésie",
      "slug": "indonesie",
      "code": "ID",
      "iso3": "IDN",
      "phone_code": "+62",
      "currency": "IDR",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/id.svg",
      "created_at": "2025-09-15T06:30:48.000Z"
    },
    {
      "id": 79,
      "name": "Irak",
      "slug": "irak",
      "code": "IQ",
      "iso3": "IRQ",
      "phone_code": "+964",
      "currency": "IQD",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/iq.svg",
      "created_at": "2025-09-15T06:30:48.000Z"
    },
    {
      "id": 78,
      "name": "Iran",
      "slug": "iran",
      "code": "IR",
      "iso3": "IRN",
      "phone_code": "+98",
      "currency": "IRR",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/ir.svg",
      "created_at": "2025-09-15T06:30:48.000Z"
    },
    {
      "id": 80,
      "name": "Irlande",
      "slug": "irlande",
      "code": "IE",
      "iso3": "IRL",
      "phone_code": "+353",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/ie.svg",
      "created_at": "2025-09-15T06:30:48.000Z"
    },
    {
      "id": 75,
      "name": "Islande",
      "slug": "islande",
      "code": "IS",
      "iso3": "ISL",
      "phone_code": "+354",
      "currency": "ISK",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/is.svg",
      "created_at": "2025-09-15T06:30:47.000Z"
    },
    {
      "id": 81,
      "name": "Israël",
      "slug": "israel",
      "code": "IL",
      "iso3": "ISR",
      "phone_code": "+972",
      "currency": "ILS",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/il.svg",
      "created_at": "2025-09-15T06:30:48.000Z"
    },
    {
      "id": 82,
      "name": "Italie",
      "slug": "italie",
      "code": "IT",
      "iso3": "ITA",
      "phone_code": "+39",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/it.svg",
      "created_at": "2025-09-15T06:30:49.000Z"
    },
    {
      "id": 83,
      "name": "Jamaïque",
      "slug": "jamaïque",
      "code": "JM",
      "iso3": "JAM",
      "phone_code": "+1876",
      "currency": "JMD",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/jm.svg",
      "created_at": "2025-09-15T06:30:49.000Z"
    },
    {
      "id": 84,
      "name": "Japon",
      "slug": "japon",
      "code": "JP",
      "iso3": "JPN",
      "phone_code": "+81",
      "currency": "JPY",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/jp.svg",
      "created_at": "2025-09-15T06:30:49.000Z"
    },
    {
      "id": 85,
      "name": "Jordanie",
      "slug": "jordanie",
      "code": "JO",
      "iso3": "JOR",
      "phone_code": "+962",
      "currency": "JOD",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/jo.svg",
      "created_at": "2025-09-15T06:30:49.000Z"
    },
    {
      "id": 86,
      "name": "Kazakhstan",
      "slug": "kazakhstan",
      "code": "KZ",
      "iso3": "KAZ",
      "phone_code": "+7",
      "currency": "KZT",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/kz.svg",
      "created_at": "2025-09-15T06:30:49.000Z"
    },
    {
      "id": 87,
      "name": "Kenya",
      "slug": "kenya",
      "code": "KE",
      "iso3": "KEN",
      "phone_code": "+254",
      "currency": "KES",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/ke.svg",
      "created_at": "2025-09-15T06:30:49.000Z"
    },
    {
      "id": 92,
      "name": "Kirghizistan",
      "slug": "kirghizistan",
      "code": "KG",
      "iso3": "KGZ",
      "phone_code": "+996",
      "currency": "KGS",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/kg.svg",
      "created_at": "2025-09-15T06:30:50.000Z"
    },
    {
      "id": 88,
      "name": "Kiribati",
      "slug": "kiribati",
      "code": "KI",
      "iso3": "KIR",
      "phone_code": "+686",
      "currency": "AUD",
      "continent": "Oceania",
      "flag_url": "https://flagcdn.com/ki.svg",
      "created_at": "2025-09-15T06:30:50.000Z"
    },
    {
      "id": 91,
      "name": "Koweït",
      "slug": "koweit",
      "code": "KW",
      "iso3": "KWT",
      "phone_code": "+965",
      "currency": "KWD",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/kw.svg",
      "created_at": "2025-09-15T06:30:50.000Z"
    },
    {
      "id": 93,
      "name": "Laos",
      "slug": "laos",
      "code": "LA",
      "iso3": "LAO",
      "phone_code": "+856",
      "currency": "LAK",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/la.svg",
      "created_at": "2025-09-15T06:30:51.000Z"
    },
    {
      "id": 96,
      "name": "Lesotho",
      "slug": "lesotho",
      "code": "LS",
      "iso3": "LSO",
      "phone_code": "+266",
      "currency": "LSL",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/ls.svg",
      "created_at": "2025-09-15T06:30:52.000Z"
    },
    {
      "id": 94,
      "name": "Lettonie",
      "slug": "lettonie",
      "code": "LV",
      "iso3": "LVA",
      "phone_code": "+371",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/lv.svg",
      "created_at": "2025-09-15T06:30:51.000Z"
    },
    {
      "id": 95,
      "name": "Liban",
      "slug": "liban",
      "code": "LB",
      "iso3": "LBN",
      "phone_code": "+961",
      "currency": "LBP",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/lb.svg",
      "created_at": "2025-09-15T06:30:52.000Z"
    },
    {
      "id": 97,
      "name": "Libéria",
      "slug": "liberia",
      "code": "LR",
      "iso3": "LBR",
      "phone_code": "+231",
      "currency": "LRD",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/lr.svg",
      "created_at": "2025-09-15T06:30:53.000Z"
    },
    {
      "id": 98,
      "name": "Libye",
      "slug": "libye",
      "code": "LY",
      "iso3": "LBY",
      "phone_code": "+218",
      "currency": "LYD",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/ly.svg",
      "created_at": "2025-09-15T06:30:53.000Z"
    },
    {
      "id": 99,
      "name": "Liechtenstein",
      "slug": "liechtenstein",
      "code": "LI",
      "iso3": "LIE",
      "phone_code": "+423",
      "currency": "CHF",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/li.svg",
      "created_at": "2025-09-15T06:30:53.000Z"
    },
    {
      "id": 100,
      "name": "Lituanie",
      "slug": "lituanie",
      "code": "LT",
      "iso3": "LTU",
      "phone_code": "+370",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/lt.svg",
      "created_at": "2025-09-15T06:30:54.000Z"
    },
    {
      "id": 101,
      "name": "Luxembourg",
      "slug": "luxembourg",
      "code": "LU",
      "iso3": "LUX",
      "phone_code": "+352",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/lu.svg",
      "created_at": "2025-09-15T06:30:54.000Z"
    },
    {
      "id": 102,
      "name": "Macédoine du Nord",
      "slug": "macedoine-du-nord",
      "code": "MK",
      "iso3": "MKD",
      "phone_code": "+389",
      "currency": "MKD",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/mk.svg",
      "created_at": "2025-09-15T06:30:54.000Z"
    },
    {
      "id": 103,
      "name": "Madagascar",
      "slug": "madagascar",
      "code": "MG",
      "iso3": "MDG",
      "phone_code": "+261",
      "currency": "MGA",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/mg.svg",
      "created_at": "2025-09-15T06:30:54.000Z"
    },
    {
      "id": 105,
      "name": "Malaisie",
      "slug": "malaisie",
      "code": "MY",
      "iso3": "MYS",
      "phone_code": "+60",
      "currency": "MYR",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/my.svg",
      "created_at": "2025-09-15T06:30:55.000Z"
    },
    {
      "id": 104,
      "name": "Malawi",
      "slug": "malawi",
      "code": "MW",
      "iso3": "MWI",
      "phone_code": "+265",
      "currency": "MWK",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/mw.svg",
      "created_at": "2025-09-15T06:30:54.000Z"
    },
    {
      "id": 106,
      "name": "Maldives",
      "slug": "maldives",
      "code": "MV",
      "iso3": "MDV",
      "phone_code": "+960",
      "currency": "MVR",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/mv.svg",
      "created_at": "2025-09-15T06:30:55.000Z"
    },
    {
      "id": 107,
      "name": "Mali",
      "slug": "mali",
      "code": "ML",
      "iso3": "MLI",
      "phone_code": "+223",
      "currency": "XOF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/ml.svg",
      "created_at": "2025-09-15T06:30:55.000Z"
    },
    {
      "id": 108,
      "name": "Malte",
      "slug": "malte",
      "code": "MT",
      "iso3": "MLT",
      "phone_code": "+356",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/mt.svg",
      "created_at": "2025-09-15T06:30:55.000Z"
    },
    {
      "id": 118,
      "name": "Maroc",
      "slug": "maroc",
      "code": "MA",
      "iso3": "MAR",
      "phone_code": "+212",
      "currency": "MAD",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/ma.svg",
      "created_at": "2025-09-15T06:30:58.000Z"
    },
    {
      "id": 111,
      "name": "Maurice",
      "slug": "maurice",
      "code": "MU",
      "iso3": "MUS",
      "phone_code": "+230",
      "currency": "MUR",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/mu.svg",
      "created_at": "2025-09-15T06:30:56.000Z"
    },
    {
      "id": 110,
      "name": "Mauritanie",
      "slug": "mauritanie",
      "code": "MR",
      "iso3": "MRT",
      "phone_code": "+222",
      "currency": "MRU",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/mr.svg",
      "created_at": "2025-09-15T06:30:56.000Z"
    },
    {
      "id": 112,
      "name": "Mexique",
      "slug": "mexique",
      "code": "MX",
      "iso3": "MEX",
      "phone_code": "+52",
      "currency": "MXN",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/mx.svg",
      "created_at": "2025-09-15T06:30:57.000Z"
    },
    {
      "id": 113,
      "name": "Micronésie",
      "slug": "micronesie",
      "code": "FM",
      "iso3": "FSM",
      "phone_code": "+691",
      "currency": "USD",
      "continent": "Oceania",
      "flag_url": "https://flagcdn.com/fm.svg",
      "created_at": "2025-09-15T06:30:57.000Z"
    },
    {
      "id": 114,
      "name": "Moldavie",
      "slug": "moldavie",
      "code": "MD",
      "iso3": "MDA",
      "phone_code": "+373",
      "currency": "MDL",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/md.svg",
      "created_at": "2025-09-15T06:30:57.000Z"
    },
    {
      "id": 115,
      "name": "Monaco",
      "slug": "monaco",
      "code": "MC",
      "iso3": "MCO",
      "phone_code": "+377",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/mc.svg",
      "created_at": "2025-09-15T06:30:57.000Z"
    },
    {
      "id": 116,
      "name": "Mongolie",
      "slug": "mongolie",
      "code": "MN",
      "iso3": "MNG",
      "phone_code": "+976",
      "currency": "MNT",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/mn.svg",
      "created_at": "2025-09-15T06:30:58.000Z"
    },
    {
      "id": 117,
      "name": "Monténégro",
      "slug": "montenegro",
      "code": "ME",
      "iso3": "MNE",
      "phone_code": "+382",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/me.svg",
      "created_at": "2025-09-15T06:30:58.000Z"
    },
    {
      "id": 119,
      "name": "Mozambique",
      "slug": "mozambique",
      "code": "MZ",
      "iso3": "MOZ",
      "phone_code": "+258",
      "currency": "MZN",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/mz.svg",
      "created_at": "2025-09-15T06:30:58.000Z"
    },
    {
      "id": 120,
      "name": "Myanmar",
      "slug": "myanmar",
      "code": "MM",
      "iso3": "MMR",
      "phone_code": "+95",
      "currency": "MMK",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/mm.svg",
      "created_at": "2025-09-15T06:30:59.000Z"
    },
    {
      "id": 121,
      "name": "Namibie",
      "slug": "namibie",
      "code": "NA",
      "iso3": "NAM",
      "phone_code": "+264",
      "currency": "NAD",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/na.svg",
      "created_at": "2025-09-15T06:30:59.000Z"
    },
    {
      "id": 122,
      "name": "Nauru",
      "slug": "nauru",
      "code": "NR",
      "iso3": "NRU",
      "phone_code": "+674",
      "currency": "AUD",
      "continent": "Oceania",
      "flag_url": "https://flagcdn.com/nr.svg",
      "created_at": "2025-09-15T06:30:59.000Z"
    },
    {
      "id": 123,
      "name": "Népal",
      "slug": "nepal",
      "code": "NP",
      "iso3": "NPL",
      "phone_code": "+977",
      "currency": "NPR",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/np.svg",
      "created_at": "2025-09-15T06:30:59.000Z"
    },
    {
      "id": 126,
      "name": "Nicaragua",
      "slug": "nicaragua",
      "code": "NI",
      "iso3": "NIC",
      "phone_code": "+505",
      "currency": "NIO",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/ni.svg",
      "created_at": "2025-09-15T06:31:00.000Z"
    },
    {
      "id": 127,
      "name": "Niger",
      "slug": "niger",
      "code": "NE",
      "iso3": "NER",
      "phone_code": "+227",
      "currency": "XOF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/ne.svg",
      "created_at": "2025-09-15T06:31:00.000Z"
    },
    {
      "id": 128,
      "name": "Nigeria",
      "slug": "nigeria",
      "code": "NG",
      "iso3": "NGA",
      "phone_code": "+234",
      "currency": "NGN",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/ng.svg",
      "created_at": "2025-09-15T06:31:00.000Z"
    },
    {
      "id": 129,
      "name": "Norvège",
      "slug": "norvege",
      "code": "NO",
      "iso3": "NOR",
      "phone_code": "+47",
      "currency": "NOK",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/no.svg",
      "created_at": "2025-09-15T06:31:00.000Z"
    },
    {
      "id": 125,
      "name": "Nouvelle-Zélande",
      "slug": "nouvelle-zelande",
      "code": "NZ",
      "iso3": "NZL",
      "phone_code": "+64",
      "currency": "NZD",
      "continent": "Oceania",
      "flag_url": "https://flagcdn.com/nz.svg",
      "created_at": "2025-09-15T06:31:00.000Z"
    },
    {
      "id": 130,
      "name": "Oman",
      "slug": "oman",
      "code": "OM",
      "iso3": "OMN",
      "phone_code": "+968",
      "currency": "OMR",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/om.svg",
      "created_at": "2025-09-15T06:31:01.000Z"
    },
    {
      "id": 181,
      "name": "Ouganda",
      "slug": "ouganda",
      "code": "UG",
      "iso3": "UGA",
      "phone_code": "+256",
      "currency": "UGX",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/ug.svg",
      "created_at": "2025-09-15T06:31:11.000Z"
    },
    {
      "id": 187,
      "name": "Ouzbékistan",
      "slug": "ouzbekistan",
      "code": "UZ",
      "iso3": "UZB",
      "phone_code": "+998",
      "currency": "UZS",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/uz.svg",
      "created_at": "2025-09-15T06:31:12.000Z"
    },
    {
      "id": 131,
      "name": "Pakistan",
      "slug": "pakistan",
      "code": "PK",
      "iso3": "PAK",
      "phone_code": "+92",
      "currency": "PKR",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/pk.svg",
      "created_at": "2025-09-15T06:31:01.000Z"
    },
    {
      "id": 132,
      "name": "Palaos",
      "slug": "palaos",
      "code": "PW",
      "iso3": "PLW",
      "phone_code": "+680",
      "currency": "USD",
      "continent": "Oceania",
      "flag_url": "https://flagcdn.com/pw.svg",
      "created_at": "2025-09-15T06:31:01.000Z"
    },
    {
      "id": 133,
      "name": "Panama",
      "slug": "panama",
      "code": "PA",
      "iso3": "PAN",
      "phone_code": "+507",
      "currency": "PAB",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/pa.svg",
      "created_at": "2025-09-15T06:31:01.000Z"
    },
    {
      "id": 134,
      "name": "Papouasie-Nouvelle-Guinée",
      "slug": "papouasie-nouvelle-guinee",
      "code": "PG",
      "iso3": "PNG",
      "phone_code": "+675",
      "currency": "PGK",
      "continent": "Oceania",
      "flag_url": "https://flagcdn.com/pg.svg",
      "created_at": "2025-09-15T06:31:01.000Z"
    },
    {
      "id": 135,
      "name": "Paraguay",
      "slug": "paraguay",
      "code": "PY",
      "iso3": "PRY",
      "phone_code": "+595",
      "currency": "PYG",
      "continent": "South America",
      "flag_url": "https://flagcdn.com/py.svg",
      "created_at": "2025-09-15T06:31:02.000Z"
    },
    {
      "id": 124,
      "name": "Pays-Bas",
      "slug": "pays-bas",
      "code": "NL",
      "iso3": "NLD",
      "phone_code": "+31",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/nl.svg",
      "created_at": "2025-09-15T06:30:59.000Z"
    },
    {
      "id": 136,
      "name": "Pérou",
      "slug": "perou",
      "code": "PE",
      "iso3": "PER",
      "phone_code": "+51",
      "currency": "PEN",
      "continent": "South America",
      "flag_url": "https://flagcdn.com/pe.svg",
      "created_at": "2025-09-15T06:31:02.000Z"
    },
    {
      "id": 137,
      "name": "Philippines",
      "slug": "philippines",
      "code": "PH",
      "iso3": "PHL",
      "phone_code": "+63",
      "currency": "PHP",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/ph.svg",
      "created_at": "2025-09-15T06:31:02.000Z"
    },
    {
      "id": 138,
      "name": "Pologne",
      "slug": "pologne",
      "code": "PL",
      "iso3": "POL",
      "phone_code": "+48",
      "currency": "PLN",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/pl.svg",
      "created_at": "2025-09-15T06:31:02.000Z"
    },
    {
      "id": 139,
      "name": "Portugal",
      "slug": "portugal",
      "code": "PT",
      "iso3": "PRT",
      "phone_code": "+351",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/pt.svg",
      "created_at": "2025-09-15T06:31:03.000Z"
    },
    {
      "id": 140,
      "name": "Qatar",
      "slug": "qatar",
      "code": "QA",
      "iso3": "QAT",
      "phone_code": "+974",
      "currency": "QAR",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/qa.svg",
      "created_at": "2025-09-15T06:31:03.000Z"
    },
    {
      "id": 33,
      "name": "République centrafricaine",
      "slug": "republique-centrafricaine",
      "code": "CF",
      "iso3": "CAF",
      "phone_code": "+236",
      "currency": "XAF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/cf.svg",
      "created_at": "2025-09-15T06:30:40.000Z"
    },
    {
      "id": 49,
      "name": "République dominicaine",
      "slug": "republique-dominicaine",
      "code": "DO",
      "iso3": "DOM",
      "phone_code": "+1809",
      "currency": "DOP",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/do.svg",
      "created_at": "2025-09-15T06:30:43.000Z"
    },
    {
      "id": 45,
      "name": "République tchèque",
      "slug": "republique-tcheque",
      "code": "CZ",
      "iso3": "CZE",
      "phone_code": "+420",
      "currency": "CZK",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/cz.svg",
      "created_at": "2025-09-15T06:30:42.000Z"
    },
    {
      "id": 141,
      "name": "Roumanie",
      "slug": "roumanie",
      "code": "RO",
      "iso3": "ROU",
      "phone_code": "+40",
      "currency": "RON",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/ro.svg",
      "created_at": "2025-09-15T06:31:03.000Z"
    },
    {
      "id": 184,
      "name": "Royaume-Uni",
      "slug": "royaume-uni",
      "code": "GB",
      "iso3": "GBR",
      "phone_code": "+44",
      "currency": "GBP",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/gb.svg",
      "created_at": "2025-09-15T06:31:12.000Z"
    },
    {
      "id": 142,
      "name": "Russie",
      "slug": "russie",
      "code": "RU",
      "iso3": "RUS",
      "phone_code": "+7",
      "currency": "RUB",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/ru.svg",
      "created_at": "2025-09-15T06:31:03.000Z"
    },
    {
      "id": 143,
      "name": "Rwanda",
      "slug": "rwanda",
      "code": "RW",
      "iso3": "RWA",
      "phone_code": "+250",
      "currency": "RWF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/rw.svg",
      "created_at": "2025-09-15T06:31:03.000Z"
    },
    {
      "id": 144,
      "name": "Saint-Christophe-et-Niévès",
      "slug": "saint-christophe-et-nieves",
      "code": "KN",
      "iso3": "KNA",
      "phone_code": "+1869",
      "currency": "XCD",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/kn.svg",
      "created_at": "2025-09-15T06:31:03.000Z"
    },
    {
      "id": 148,
      "name": "Saint-Marin",
      "slug": "saint-marin",
      "code": "SM",
      "iso3": "SMR",
      "phone_code": "+378",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/sm.svg",
      "created_at": "2025-09-15T06:31:04.000Z"
    },
    {
      "id": 146,
      "name": "Saint-Vincent-et-les-Grenadines",
      "slug": "saint-vincent-et-les-grenadines",
      "code": "VC",
      "iso3": "VCT",
      "phone_code": "+1784",
      "currency": "XCD",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/vc.svg",
      "created_at": "2025-09-15T06:31:04.000Z"
    },
    {
      "id": 145,
      "name": "Sainte-Lucie",
      "slug": "sainte-lucie",
      "code": "LC",
      "iso3": "LCA",
      "phone_code": "+1758",
      "currency": "XCD",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/lc.svg",
      "created_at": "2025-09-15T06:31:04.000Z"
    },
    {
      "id": 147,
      "name": "Samoa",
      "slug": "samoa",
      "code": "WS",
      "iso3": "WSM",
      "phone_code": "+685",
      "currency": "WST",
      "continent": "Oceania",
      "flag_url": "https://flagcdn.com/ws.svg",
      "created_at": "2025-09-15T06:31:04.000Z"
    },
    {
      "id": 149,
      "name": "São Tomé-et-Principe",
      "slug": "sao-tome-et-principe",
      "code": "ST",
      "iso3": "STP",
      "phone_code": "+239",
      "currency": "STN",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/st.svg",
      "created_at": "2025-09-15T06:31:04.000Z"
    },
    {
      "id": 151,
      "name": "Sénégal",
      "slug": "senegal",
      "code": "SN",
      "iso3": "SEN",
      "phone_code": "+221",
      "currency": "XOF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/sn.svg",
      "created_at": "2025-09-15T06:31:05.000Z"
    },
    {
      "id": 152,
      "name": "Serbie",
      "slug": "serbie",
      "code": "RS",
      "iso3": "SRB",
      "phone_code": "+381",
      "currency": "RSD",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/rs.svg",
      "created_at": "2025-09-15T06:31:05.000Z"
    },
    {
      "id": 153,
      "name": "Seychelles",
      "slug": "seychelles",
      "code": "SC",
      "iso3": "SYC",
      "phone_code": "+248",
      "currency": "SCR",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/sc.svg",
      "created_at": "2025-09-15T06:31:05.000Z"
    },
    {
      "id": 154,
      "name": "Sierra Leone",
      "slug": "sierra-leone",
      "code": "SL",
      "iso3": "SLE",
      "phone_code": "+232",
      "currency": "SLL",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/sl.svg",
      "created_at": "2025-09-15T06:31:05.000Z"
    },
    {
      "id": 155,
      "name": "Singapour",
      "slug": "singapour",
      "code": "SG",
      "iso3": "SGP",
      "phone_code": "+65",
      "currency": "SGD",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/sg.svg",
      "created_at": "2025-09-15T06:31:05.000Z"
    },
    {
      "id": 156,
      "name": "Slovaquie",
      "slug": "slovaquie",
      "code": "SK",
      "iso3": "SVK",
      "phone_code": "+421",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/sk.svg",
      "created_at": "2025-09-15T06:31:05.000Z"
    },
    {
      "id": 157,
      "name": "Slovénie",
      "slug": "slovenie",
      "code": "SI",
      "iso3": "SVN",
      "phone_code": "+386",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/si.svg",
      "created_at": "2025-09-15T06:31:06.000Z"
    },
    {
      "id": 159,
      "name": "Somalie",
      "slug": "somalie",
      "code": "SO",
      "iso3": "SOM",
      "phone_code": "+252",
      "currency": "SOS",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/so.svg",
      "created_at": "2025-09-15T06:31:06.000Z"
    },
    {
      "id": 164,
      "name": "Soudan",
      "slug": "soudan",
      "code": "SD",
      "iso3": "SDN",
      "phone_code": "+249",
      "currency": "SDG",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/sd.svg",
      "created_at": "2025-09-15T06:31:07.000Z"
    },
    {
      "id": 161,
      "name": "Soudan du Sud",
      "slug": "soudan-du-sud",
      "code": "SS",
      "iso3": "SSD",
      "phone_code": "+211",
      "currency": "SSP",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/ss.svg",
      "created_at": "2025-09-15T06:31:06.000Z"
    },
    {
      "id": 163,
      "name": "Sri Lanka",
      "slug": "sri-lanka",
      "code": "LK",
      "iso3": "LKA",
      "phone_code": "+94",
      "currency": "LKR",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/lk.svg",
      "created_at": "2025-09-15T06:31:07.000Z"
    },
    {
      "id": 167,
      "name": "Suède",
      "slug": "suede",
      "code": "SE",
      "iso3": "SWE",
      "phone_code": "+46",
      "currency": "SEK",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/se.svg",
      "created_at": "2025-09-15T06:31:08.000Z"
    },
    {
      "id": 168,
      "name": "Suisse",
      "slug": "suisse",
      "code": "CH",
      "iso3": "CHE",
      "phone_code": "+41",
      "currency": "CHF",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/ch.svg",
      "created_at": "2025-09-15T06:31:08.000Z"
    },
    {
      "id": 165,
      "name": "Suriname",
      "slug": "suriname",
      "code": "SR",
      "iso3": "SUR",
      "phone_code": "+597",
      "currency": "SRD",
      "continent": "South America",
      "flag_url": "https://flagcdn.com/sr.svg",
      "created_at": "2025-09-15T06:31:07.000Z"
    },
    {
      "id": 169,
      "name": "Syrie",
      "slug": "syrie",
      "code": "SY",
      "iso3": "SYR",
      "phone_code": "+963",
      "currency": "SYP",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/sy.svg",
      "created_at": "2025-09-15T06:31:08.000Z"
    },
    {
      "id": 170,
      "name": "Tadjikistan",
      "slug": "tadjikistan",
      "code": "TJ",
      "iso3": "TJK",
      "phone_code": "+992",
      "currency": "TJS",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/tj.svg",
      "created_at": "2025-09-15T06:31:08.000Z"
    },
    {
      "id": 171,
      "name": "Tanzanie",
      "slug": "tanzanie",
      "code": "TZ",
      "iso3": "TZA",
      "phone_code": "+255",
      "currency": "TZS",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/tz.svg",
      "created_at": "2025-09-15T06:31:09.000Z"
    },
    {
      "id": 34,
      "name": "Tchad",
      "slug": "tchad",
      "code": "TD",
      "iso3": "TCD",
      "phone_code": "+235",
      "currency": "XAF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/td.svg",
      "created_at": "2025-09-15T06:30:40.000Z"
    },
    {
      "id": 172,
      "name": "Thaïlande",
      "slug": "thailande",
      "code": "TH",
      "iso3": "THA",
      "phone_code": "+66",
      "currency": "THB",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/th.svg",
      "created_at": "2025-09-15T06:31:09.000Z"
    },
    {
      "id": 173,
      "name": "Timor oriental",
      "slug": "timor-oriental",
      "code": "TL",
      "iso3": "TLS",
      "phone_code": "+670",
      "currency": "USD",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/tl.svg",
      "created_at": "2025-09-15T06:31:09.000Z"
    },
    {
      "id": 174,
      "name": "Togo",
      "slug": "togo",
      "code": "TG",
      "iso3": "TGO",
      "phone_code": "+228",
      "currency": "XOF",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/tg.svg",
      "created_at": "2025-09-15T06:31:10.000Z"
    },
    {
      "id": 175,
      "name": "Tonga",
      "slug": "tonga",
      "code": "TO",
      "iso3": "TON",
      "phone_code": "+676",
      "currency": "TOP",
      "continent": "Oceania",
      "flag_url": "https://flagcdn.com/to.svg",
      "created_at": "2025-09-15T06:31:10.000Z"
    },
    {
      "id": 176,
      "name": "Trinité-et-Tobago",
      "slug": "trinite-et-tobago",
      "code": "TT",
      "iso3": "TTO",
      "phone_code": "+1868",
      "currency": "TTD",
      "continent": "North America",
      "flag_url": "https://flagcdn.com/tt.svg",
      "created_at": "2025-09-15T06:31:10.000Z"
    },
    {
      "id": 177,
      "name": "Tunisie",
      "slug": "tunisie",
      "code": "TN",
      "iso3": "TUN",
      "phone_code": "+216",
      "currency": "TND",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/tn.svg",
      "created_at": "2025-09-15T06:31:10.000Z"
    },
    {
      "id": 179,
      "name": "Turkménistan",
      "slug": "turkmenistan",
      "code": "TM",
      "iso3": "TKM",
      "phone_code": "+993",
      "currency": "TMT",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/tm.svg",
      "created_at": "2025-09-15T06:31:11.000Z"
    },
    {
      "id": 178,
      "name": "Turquie",
      "slug": "turquie",
      "code": "TR",
      "iso3": "TUR",
      "phone_code": "+90",
      "currency": "TRY",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/tr.svg",
      "created_at": "2025-09-15T06:31:10.000Z"
    },
    {
      "id": 180,
      "name": "Tuvalu",
      "slug": "tuvalu",
      "code": "TV",
      "iso3": "TUV",
      "phone_code": "+688",
      "currency": "AUD",
      "continent": "Oceania",
      "flag_url": "https://flagcdn.com/tv.svg",
      "created_at": "2025-09-15T06:31:11.000Z"
    },
    {
      "id": 182,
      "name": "Ukraine",
      "slug": "ukraine",
      "code": "UA",
      "iso3": "UKR",
      "phone_code": "+380",
      "currency": "UAH",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/ua.svg",
      "created_at": "2025-09-15T06:31:11.000Z"
    },
    {
      "id": 186,
      "name": "Uruguay",
      "slug": "uruguay",
      "code": "UY",
      "iso3": "URY",
      "phone_code": "+598",
      "currency": "UYU",
      "continent": "South America",
      "flag_url": "https://flagcdn.com/uy.svg",
      "created_at": "2025-09-15T06:31:12.000Z"
    },
    {
      "id": 188,
      "name": "Vanuatu",
      "slug": "vanuatu",
      "code": "VU",
      "iso3": "VUT",
      "phone_code": "+678",
      "currency": "VUV",
      "continent": "Oceania",
      "flag_url": "https://flagcdn.com/vu.svg",
      "created_at": "2025-09-15T06:31:13.000Z"
    },
    {
      "id": 189,
      "name": "Vatican",
      "slug": "vatican",
      "code": "VA",
      "iso3": "VAT",
      "phone_code": "+379",
      "currency": "EUR",
      "continent": "Europe",
      "flag_url": "https://flagcdn.com/va.svg",
      "created_at": "2025-09-15T06:31:13.000Z"
    },
    {
      "id": 190,
      "name": "Venezuela",
      "slug": "venezuela",
      "code": "VE",
      "iso3": "VEN",
      "phone_code": "+58",
      "currency": "VES",
      "continent": "South America",
      "flag_url": "https://flagcdn.com/ve.svg",
      "created_at": "2025-09-15T06:31:14.000Z"
    },
    {
      "id": 191,
      "name": "Viêt Nam",
      "slug": "viet-nam",
      "code": "VN",
      "iso3": "VNM",
      "phone_code": "+84",
      "currency": "VND",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/vn.svg",
      "created_at": "2025-09-15T06:31:14.000Z"
    },
    {
      "id": 192,
      "name": "Yémen",
      "slug": "yemen",
      "code": "YE",
      "iso3": "YEM",
      "phone_code": "+967",
      "currency": "YER",
      "continent": "Asia",
      "flag_url": "https://flagcdn.com/ye.svg",
      "created_at": "2025-09-15T06:31:15.000Z"
    },
    {
      "id": 193,
      "name": "Zambie",
      "slug": "zambie",
      "code": "ZM",
      "iso3": "ZMB",
      "phone_code": "+260",
      "currency": "ZMW",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/zm.svg",
      "created_at": "2025-09-15T06:31:15.000Z"
    },
    {
      "id": 194,
      "name": "Zimbabwe",
      "slug": "zimbabwe",
      "code": "ZW",
      "iso3": "ZWE",
      "phone_code": "+263",
      "currency": "ZWL",
      "continent": "Africa",
      "flag_url": "https://flagcdn.com/zw.svg",
      "created_at": "2025-09-15T06:31:16.000Z"
    }
  ]
type Product = {
  id: number;
  slug: string;
  name: string;
  description?: string;
  price: number;
  sale_price?: number;
  categories?: string[];
  image?: { url: string };
  stock?: number;
  rating?: number;
  shop?: { id: number; slug: string; name: string };
};

const LIMIT = 20;

export default function ProductsPage() {
const router = useRouter();
const token = getAuthToken(); // 🔁 Remplace par ton token
const [isInitializing, setIsInitializing] = useState(true);
const detectUserCountry = async (): Promise<string | null> => {
  try {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();

    const userCode = data?.country_code; // ex: BJ, FR, US

    if (!userCode) return null;

    const found = pays.find(
      (p) => p.code.toUpperCase() === userCode.toUpperCase()
    );

    return found ? String(found.id) : null;
  } catch (e) {
    console.error('Country detect failed', e);
    return null;
  }
};
useEffect(() => {
  if (!router.isReady) return;

  const { countries_id } = router.query;

  if (!countries_id) {
    detectUserCountry().then((detectedId) => {
      if (!detectedId) return;

      router.replace({
        pathname: router.pathname,
        query: {
          ...router.query,
          countries_id: detectedId,
        },
      });
    });
  }
}, [router.isReady]);

  const {
    corridor_id,
    countries_id,
    categories_id,
    sous_categories_id,
    sub_categories_id,
    search,
    is_origin, // ✅ maintenant reconnu
  } = router.query;

  const [products, setProducts] = useState<Product[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const isFetchingRef = useRef(false);
  const [countryId, setCountryId] = useState<string | null>(null);
  const fetchProducts = useCallback(async () => {
    if (isFetchingRef.current || !hasMore) return;

    setLoading(true);
    setError(null);
    isFetchingRef.current = true;

    try {
      const params: any = {
        limit: LIMIT,
        offset,
      };

      if (corridor_id) params.corridor_id = corridor_id;
      if (countries_id) params.countries_id = countries_id;
      if (categories_id) params.categories_id = categories_id;
      if (sous_categories_id) params.sous_categories_id = sous_categories_id;
      if (sub_categories_id) params.sub_categories_id = sub_categories_id;
      if (search) params.search = search;
      if (is_origin) params.is_origin = is_origin === 'true';
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/products/corridor`,
        {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const fetchedProducts: Product[] = data.data ?? [];
      setProducts((prev) =>
        offset === 0 ? fetchedProducts : [...prev, ...fetchedProducts],
      );
      setHasMore(fetchedProducts.length === LIMIT);
      setOffset((prev) => prev + fetchedProducts.length);
      setIsInitializing(false);
    } catch (e) {
      console.error(e);
      setError('Error loading products.');
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [
    corridor_id,
    countries_id,
    categories_id,
    sous_categories_id,
    sub_categories_id,
    search,
    is_origin,
    offset,
    hasMore,
  ]);

  // Réinitialiser si un filtre change
  useEffect(() => {
    setProducts([]);
    setOffset(0);
    setHasMore(true);
  }, [
    corridor_id,
    countries_id,
    categories_id,
    sous_categories_id,
    sub_categories_id,
    search,
    is_origin, // ← ajoute ça
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (router.isReady) {
      const { countries_id } = router.query;
      setCountryId(countries_id as string);
    }
  }, [router.isReady, router.query]);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (loading || !hasMore || !sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchProducts();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(sentinelRef.current);

    return () => {
      if (sentinelRef.current) observer.unobserve(sentinelRef.current);
    };
  }, [loading, hasMore, fetchProducts]);
  async function handleProductorigincheck() {
    router.push(`/products/forcategory?countries_id=${countryId}&is_origin=true`);
  }
  const country = pays.find((p) => p.id === Number(countryId));

  if (!country) return <span>Pays inconnu</span>;

  return (
    <>
      <Seo
        title="Products Category"
        description="Explore our products by category."
        url={routes.productscategory}
      />
      <ProductsUltraPremiumFilter />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <Card key={product.id} product={product} />
        ))}
      </div>

      <div ref={sentinelRef} />

      {loading && (
        <div className="flex flex-col items-center justify-center my-8 space-y-3 text-blue-600">
          <svg
            className="animate-spin h-12 w-12 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-label="Loading spinner"
            role="img"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <p className="text-lg font-semibold">Chargement...</p>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center my-8 space-y-3 text-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-label="Error icon"
            role="img"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <p className="text-lg font-semibold">{error}</p>
        </div>
      )}

{!hasMore && !loading && products.length > 0 && (
  <div className="flex flex-col items-center justify-center my-12 space-y-4 text-gray-400 dark:text-gray-500">
    {/* Icône moderne Lucide */}
    <CheckCircle className="h-14 w-14 text-brand-500 animate-bounce" />

    <p className="text-xl font-semibold text-gray-200 dark:text-gray-100">
      Plus aucun produit
    </p>
    <p className="text-sm text-gray-400 dark:text-gray-400">
      Vous avez atteint la fin de la liste.
    </p>
  </div>
)}


{!loading && products.length === 0 && !error && (
  <div
    className="flex flex-col items-center justify-center h-screen space-y-4 cursor-pointer"
    onClick={() => router.push('/products/forcategory')}
  >
    {/* Icône Lucide moderne */}
    <XCircle className="h-20 w-20 text-red-500 dark:text-red-400 animate-pulse" />

    <p className="text-2xl font-bold text-gray-100 dark:text-gray-50 text-center">
      Aucun produit ne correspond à ces filtres
    </p>
    <p className="text-sm text-gray-400 dark:text-gray-400 text-center">
      Cliquez ici pour revenir à tous les produits
    </p>
  </div>
)}

      <div className="hidden fixed top-1/2 right-1 transform -translate-y-1/2 z-50">
        <button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="relative flex items-center justify-center w-9 h-9 bg-pink-500 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          {/* Icon settings qui tourne */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-white animate-spin-slow"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v2m0 12v2m8-8h-2M4 12H2m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 7.464"
            />
          </svg>

          {/* Texte qui apparaît au hover */}
          <span
            className={`absolute -left-56 w-48 bg-white text-gray-900 px-3 py-2 rounded-lg shadow-lg text-sm font-medium transition-all duration-500 ${hover ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}
            onClick={handleProductorigincheck}
          >
            <span
              className="flex items-center text-gray-400  text-sm"
              style={{
                fontFamily: '"Segoe UI Emoji", "Apple Color Emoji", sans-serif',
              }}
            >
              Made in
              {country.flag_url ? (
                <Image
                  src={country.flag_url}
                  alt={`Drapeau ${country.name}`}
                  width={24}
                  height={16}
                  className="ml-2"
                />
              ) : (
                <div>Image non disponible</div>
              )}

              <p className="ml-2">{country.name}</p>
            </span>
          </span>
        </button>

        {/* Tailwind custom animation */}
        <style jsx>{`
          .animate-spin-slow {
            animation: spin 20s linear infinite;
          }
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
      {isInitializing && (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
    <div className="flex space-x-2">
      <span className="dot animate-bounce bg-pink-500 w-3 h-3 rounded-full"></span>
      <span className="dot animate-bounce animation-delay-200 bg-pink-500 w-3 h-3 rounded-full"></span>
      <span className="dot animate-bounce animation-delay-400 bg-pink-500 w-3 h-3 rounded-full"></span>
    </div>
    <p className="mt-4 text-lg font-semibold text-gray-700">Chargement...</p>

    <style jsx>{`
      .animate-bounce {
        animation: bounce 0.6s infinite alternate;
      }
      .animation-delay-200 {
        animation-delay: 0.2s;
      }
      .animation-delay-400 {
        animation-delay: 0.4s;
      }
      @keyframes bounce {
        from { transform: translateY(0); }
        to { transform: translateY(-10px); }
      }
    `}</style>
  </div>
)}

    </>
  );
}

ProductsPage.authorization = true;
ProductsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};
