import { NextResponse } from "next/server";

interface GetUserInfoResponse {
    id?: string
    message?: string
}

export async function GET(request: Request): Promise<NextResponse<GetUserInfoResponse>> {
    const headers = request.headers
    const authorization = headers.get('Authorization')

    if (!authorization) {
        return NextResponse.json({ message: 'Nao autorizado' }, { status: 401 })
    }

    return NextResponse.json({ id: 'id-usuario'})
}
