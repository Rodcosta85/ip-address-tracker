export interface asProps {
    asn: number,
    domain: string,
    name: string,
    route: string,
    type: string
}

export interface LocationObjProps {
    country: string,
    region: string,
    timezone: string
}

export interface LocationProps {
    as: asProps,
    ip: string,
    isp: string,
    location: LocationObjProps
}