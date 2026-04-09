from typing import Any, Optional, List, Dict
from ..database import get_pool

INDICATOR_MAP = {
    "ugrad_inquota_students_rank": "학부 정원내 재학생수",
    "ugrad_total_students_rank": "학부 정원내외 재학생수",
    "total_students_rank": "학부 및 대학원 재학생수",
    "tuition_won_rank": "등록금(원)",
    "op_income_total_won_for_tuition_rank": "운영수입(세입총액)(원)",
    "tuition_income_ratio_rank": "[1.4] 세입 중 등록금 비율",
    "donation_won_rank": "기부금(원)",
    "op_income_total_won_for_donation_rank": "운영수입(세입총액)(원)",
    "donation_income_ratio_rank": "[1.4] 세입 중 기부금 비율",
    "corp_transfer_won_rank": "법인전입금(원)",
    "op_income_won_for_corp_transfer_rank": "운영수입(원)",
    "corp_transfer_income_ratio_private_rank": "[1.4] 세입 중 법인전입금 비율(사립대)",
    "total_education_cost_won_rank": "총교육비(원)",
    "tuition_won_for_education_return_rank": "등록금(원)",
    "education_cost_return_ratio_rank": "[1.5] 교육비 환원율",
    "ft_faculty_cnt_rank": "전임교원수(명)",
    "faculty_legal_quota_cnt_rank": "교원법정정원(명)",
    "ft_faculty_securement_ratio_rank": "[3.1] 전임교원 확보율",
    "lecturer_fee_total_won_rank": "강사료 계(원)",
    "lecture_hours_total_rank": "강의시간수 계(시간)",
    "lecturer_fee_per_hour_rank": "[3.3] 강사 강의료",
    "internal_research_fund_k_won_rank": "교내연구비(천원)",
    "ft_faculty_cnt_for_internal_research_rank": "전임교원수(명)",
    "internal_research_fund_per_ft_faculty_rank": "[3.4] 전임교원 1인당 교내연구비",
    "total_students_for_staff_rank": "학부 및 대학원 재학생수",
    "staff_cnt_rank": "직원수(명)",
    "students_per_staff_rank": "[3.5] 직원 1인당 학생수",
    "scholarship_won_rank": "장학금(원)",
    "tuition_won_for_scholarship_rank": "등록금(원)",
    "scholarship_ratio_rank": "[4.1] 장학금 비율",
    "facility_area_sqm_rank": "시설면적(㎡)",
    "standard_area_sqm_rank": "기준면적(㎡)",
    "building_securement_ratio_rank": "[4.4] 교사 확보율",
    "dorm_capacity_cnt_rank": "수용인원(명)",
    "enrolled_students_for_dorm_rank": "재학생수(명)",
    "dormitory_capacity_ratio_rank": "[4.5] 기숙사 수용률",
    "library_material_cost_won_rank": "자료구입비(원)",
    "student_cnt_for_library_rank": "학생수(명)",
    "library_material_cost_per_student_rank": "[4.6] 재학생 1인당 연간 자료구입비(결산)",
    "library_staff_cnt_rank": "도서관직원수(명)",
    "total_students_for_library_staff_rank": "학부 및 대학원 재학생수",
    "library_staff_per_1000_students_rank": "[4.6] 재학생 1,000명당 도서관 직원수",
    "inquota_admissions_cnt_rank": "정원내 입학자수(명)",
    "inquota_recruitment_quota_cnt_rank": "정원내 모집인원(명)",
    "inquota_freshman_fill_ratio_rank": "[5.2] 정원내 신입생 충원율",
    "inquota_enrolled_students_cnt_rank": "정원내 재학생수(명)",
    "student_quota_minus_suspend_cnt_rank": "학생정원-학생모집정지인원(명)",
    "inquota_enrolled_fill_ratio_rank": "[5.2] 정원내 재학생 충원율",
    "reg_candidate_paper_cnt_rank": "등재(후보)지 논문 건수(건)",
    "ft_faculty_cnt_for_reg_paper_rank": "전임교원수(명)",
    "reg_candidate_paper_per_ft_faculty_rank": "[5.3] 전임교원 1인당 등재(후보)지 논문 실적",
    "sci_paper_cnt_rank": "SCI급 논문 건수(건)",
    "ft_faculty_cnt_for_sci_paper_rank": "전임교원수(명)",
    "sci_paper_per_ft_faculty_rank": "[5.3] 전임교원 1인당 SCI급 논문 실적",
    "books_translation_cnt_rank": "저역서수(건)",
    "ft_faculty_cnt_for_books_translation_rank": "전임교원수(명)",
    "books_translation_per_ft_faculty_rank": "[5.3] 전임교원 1인당 저역서 실적",
    "external_research_fund_k_won_rank": "교외연구비(천원)",
    "ft_faculty_cnt_for_external_research_rank": "전임교원수(명)",
    "external_research_fund_per_ft_faculty_rank": "[5.3] 전임교원 1인당 교외연구비",
    "research_perf_vs_standard_rank": "[5.3] 연구성과 기준값 대비 실적",
    "employed_cnt_rank": "취업자(명)",
    "graduates_cnt_rank": "졸업자(명)",
    "employment_rate_rank": "[5.4] 졸업생의 취업률",
}


async def search_schools(q: str) -> List[Dict[str, str]]:
    pool = await get_pool()
    if not q or not q.strip():
        return []
    
    query = f"%{q}%"
    sql = """
        SELECT school_name, school_code, MAX(establishment_type) as establishment_type, MAX(region) as region
        FROM tstt_ind
        WHERE school_name ILIKE $1
        GROUP BY school_name, school_code
        ORDER BY school_name
        LIMIT 20
    """
    
    async with pool.acquire() as conn:
        rows = await conn.fetch(sql, query)
        return [
            {
                "school_name": row["school_name"], 
                "school_code": row["school_code"],
                "establishment_type": row["establishment_type"],
                "region": row["region"]
            } for row in rows
        ]


def get_indicators() -> List[Dict[str, str]]:
    return [{"id": k, "label": v} for k, v in INDICATOR_MAP.items()]


async def get_comparison(school_code: str, indicator_ids: List[str]) -> Optional[Dict[str, Any]]:
    pool = await get_pool()
    
    valid_indicators = [ind for ind in indicator_ids if ind in INDICATOR_MAP]
    if not valid_indicators:
        return None
        
    # Valid base value columns for the ranks
    base_cols = [ind.replace('_rank', '') for ind in valid_indicators]
    
    # Construct SELECT clause safely
    select_parts = ["school_name", "year"]
    for i, _ in enumerate(valid_indicators):
        select_parts.append(f'"{valid_indicators[i]}"')
        select_parts.append(f'"{base_cols[i]}"')
        
    select_sql = ", ".join(select_parts)
    
    sql = f"""
        SELECT {select_sql}
        FROM tstt_ind
        WHERE school_code = $1
        ORDER BY year DESC
        LIMIT 1
    """
    
    async with pool.acquire() as conn:
        row = await conn.fetchrow(sql, school_code)
        
        if not row:
            return None
            
        rankings = []
        for i, ind_id in enumerate(valid_indicators):
            base_col = base_cols[i]
            rankings.append({
                "indicator": ind_id,
                "value": row[base_col],
                "rank": row[ind_id]
            })
            
        return {
            "school_name": row["school_name"],
            "year": row["year"],
            "rankings": rankings
        }
