import responseCodes from '../response_codes'

export function	responseCodeMapper(code):any{
		return responseCodes[code]
	}