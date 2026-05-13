// Single source of truth for the rel attribute on outbound product/affiliate
// links. While no affiliate or sponsorship agreements are in place, we use
// "nofollow noopener noreferrer" — telling search engines we don't vouch for
// these links with our domain authority. When affiliate programs are active,
// change "nofollow" to "sponsored" here and every outbound product link will
// pick up the change.
//
// Per Google's link attribute guidance:
//   - "sponsored" — links created as part of advertisements, sponsorships,
//     or other compensation agreements (Amazon Associates etc.)
//   - "nofollow"  — links you don't want to endorse or pass ranking signal to
//
// See: https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links

export const PRODUCT_LINK_REL = "nofollow noopener noreferrer";
export const RATING_LINK_REL = "noopener noreferrer";
