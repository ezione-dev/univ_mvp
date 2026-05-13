import { test, expect } from '@playwright/test';

test.describe('아이템 관리 - 컨텐츠 즉시 수정 (Quick Edit) 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[id="loginEmail"]', 'test1@cnu.ac.kr');
    await page.fill('input[id="password"]', 'dlwldnjs');
    await page.click('button:has-text("로그인")');
    await page.waitForURL('/', { timeout: 10000 });
    await page.goto('/admin/items');
    await page.waitForSelector('table tbody tr');
  });

  test('아이템 테이블에서 컨텐츠 ID 클릭 시 수정 모달이 열리고 일반 정보가 숨겨져야 함', async ({ page }) => {
    const sqlIdButton = page.locator('table tbody tr').first().locator('td:nth-child(4) button');
    await sqlIdButton.click();
    
    // 모달 식별 (role="dialog" 사용)
    const modal = page.locator('div[role="dialog"]:has-text("컨텐츠 수정")');
    await expect(modal).toBeVisible();

    // 일반 정보 숨김 확인
    await expect(modal.locator('text=일반 정보')).not.toBeVisible();
    await expect(modal.locator('text=컨텐츠명')).not.toBeVisible();
    
    // 설정 섹션 표시 확인
    await expect(modal.locator('text=데이터 조회 상세')).toBeVisible();
    
    await page.click('button:has-text("취소")');
    await expect(modal).toBeHidden();
  });

  test('SQL 편집기에서 {{base_year}} 포함 여부에 따라 기준연도 체크박스가 연동되어야 함', async ({ page }) => {
    await page.locator('table tbody tr td:nth-child(4) button').first().click();
    const modal = page.locator('div[role="dialog"]:has-text("컨텐츠 수정")');
    
    const checkbox = modal.locator('label:has-text("기준연도 사용") input[type="checkbox"]');
    const textarea = modal.locator('textarea[placeholder*="SELECT"]');

    await textarea.fill('SELECT * FROM test WHERE year = {{base_year}}');
    await expect(checkbox).toBeChecked();

    await textarea.fill('SELECT * FROM test');
    await expect(checkbox).not.toBeChecked();
    
    await page.click('button:has-text("취소")');
  });

  test('컨텐츠 수정 후 저장 시 실제 데이터가 반영되어야 함', async ({ page }) => {
    const testComment = `-- e2e test ${Date.now()}`;
    
    // 1. 수정 모달 오픈
    await page.locator('table tbody tr td:nth-child(4) button').first().click();
    const modal = page.locator('div[role="dialog"]:has-text("컨텐츠 수정")');
    const textarea = modal.locator('textarea[placeholder*="SELECT"]');
    
    const originalSql = await textarea.inputValue();
    await textarea.fill(originalSql + '\n' + testComment);

    // 2. 저장 클릭
    await modal.locator('button:has-text("수정")').click();

    // 3. 모달 닫힘 확인
    await expect(modal).toBeHidden();

    // 4. 재오픈하여 데이터 검증 (가장 확실한 성공 확인 방법)
    await page.locator('table tbody tr td:nth-child(4) button').first().click();
    const updatedSql = await textarea.inputValue();
    expect(updatedSql).toContain(testComment);
    
    // 원복 (선택 사항이나 테스트 반복을 위해 권장)
    await textarea.fill(originalSql);
    await modal.locator('button:has-text("수정")').click();
    await expect(modal).toBeHidden();
  });
});
