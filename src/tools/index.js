import JsonFormatter from './JsonFormatter.jsx'
import Base64Tool from './Base64Tool.jsx'
import UrlEncoder from './UrlEncoder.jsx'
import JwtDecoder from './JwtDecoder.jsx'
import RegexTester from './RegexTester.jsx'
import UuidGenerator from './UuidGenerator.jsx'
import HashGenerator from './HashGenerator.jsx'
import ColorConverter from './ColorConverter.jsx'
import TimestampConverter from './TimestampConverter.jsx'
import HtmlEntities from './HtmlEntities.jsx'
import MarkdownPreview from './MarkdownPreview.jsx'
import JsonToCsv from './JsonToCsv.jsx'
import CsvToJson from './CsvToJson.jsx'
import BaseConverter from './BaseConverter.jsx'
import LoremIpsum from './LoremIpsum.jsx'
import DiffChecker from './DiffChecker.jsx'
import CaseConverter from './CaseConverter.jsx'
import WordCounter from './WordCounter.jsx'
import QrGenerator from './QrGenerator.jsx'
import PasswordGenerator from './PasswordGenerator.jsx'
import CronParser from './CronParser.jsx'
import HtmlPreview from './HtmlPreview.jsx'

export const TOOLS = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, validate & minify JSON',
    icon: '{ }',
    category: 'Data',
    component: JsonFormatter,
  },
  {
    id: 'base64',
    name: 'Base64',
    description: 'Encode / decode Base64 strings',
    icon: '64',
    category: 'Encoding',
    component: Base64Tool,
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder',
    description: 'Encode / decode URL components',
    icon: '%20',
    category: 'Encoding',
    component: UrlEncoder,
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    description: 'Inspect JWT header & payload',
    icon: '🔑',
    category: 'Security',
    component: JwtDecoder,
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Live regex match highlighter',
    icon: '.*',
    category: 'Text',
    component: RegexTester,
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate v4 UUIDs in bulk',
    icon: '#',
    category: 'Generators',
    component: UuidGenerator,
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'MD5, SHA1, SHA256, SHA512',
    icon: '##',
    category: 'Security',
    component: HashGenerator,
  },
  {
    id: 'color-converter',
    name: 'Color Converter',
    description: 'HEX ↔ RGB ↔ HSL',
    icon: '🎨',
    category: 'Design',
    component: ColorConverter,
  },
  {
    id: 'timestamp',
    name: 'Timestamp',
    description: 'Unix timestamp ↔ human date',
    icon: '⏱',
    category: 'Data',
    component: TimestampConverter,
  },
  {
    id: 'html-entities',
    name: 'HTML Entities',
    description: 'Encode / decode HTML entities',
    icon: '&amp;',
    category: 'Encoding',
    component: HtmlEntities,
  },
  {
    id: 'markdown-preview',
    name: 'Markdown Preview',
    description: 'Live Markdown → HTML renderer',
    icon: 'MD',
    category: 'Text',
    component: MarkdownPreview,
  },
  {
    id: 'json-to-csv',
    name: 'JSON → CSV',
    description: 'Convert JSON arrays to CSV',
    icon: '⇄',
    category: 'Data',
    component: JsonToCsv,
  },
  {
    id: 'csv-to-json',
    name: 'CSV → JSON',
    description: 'Convert CSV to JSON array',
    icon: '⇄',
    category: 'Data',
    component: CsvToJson,
  },
  {
    id: 'base-converter',
    name: 'Base Converter',
    description: 'Binary, Octal, Decimal, Hex',
    icon: '01',
    category: 'Data',
    component: BaseConverter,
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum',
    description: 'Generate placeholder text',
    icon: 'Aa',
    category: 'Generators',
    component: LoremIpsum,
  },
  {
    id: 'diff-checker',
    name: 'Diff Checker',
    description: 'Compare two text blocks',
    icon: '±',
    category: 'Text',
    component: DiffChecker,
  },
  {
    id: 'case-converter',
    name: 'Case Converter',
    description: 'camelCase, snake_case, PascalCase…',
    icon: 'Cc',
    category: 'Text',
    component: CaseConverter,
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Words, chars, lines, read time',
    icon: 'W',
    category: 'Text',
    component: WordCounter,
  },
  {
    id: 'qr-generator',
    name: 'QR Generator',
    description: 'Generate QR codes for any text',
    icon: '▣',
    category: 'Generators',
    component: QrGenerator,
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Secure random passwords',
    icon: '🔒',
    category: 'Security',
    component: PasswordGenerator,
  },
  {
    id: 'cron-parser',
    name: 'Cron Parser',
    description: 'Human-readable cron expressions',
    icon: '⏰',
    category: 'Data',
    component: CronParser,
  },
  {
    id: 'html-preview',
    name: 'HTML Preview',
    description: 'Live HTML/CSS renderer',
    icon: '</>',
    category: 'Design',
    component: HtmlPreview,
  },
]

export const CATEGORIES = [...new Set(TOOLS.map(t => t.category))]
